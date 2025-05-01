import {v} from "convex/values";
import {mutation, query} from "./_generated/server";
import {Doc, Id} from "./_generated/dataModel";

export const archive = mutation({
    args: {id: v.id("notes")},
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.id);

        if (!existingNote) {
            throw new Error("Note not found");
        }

        if (existingNote.userId !== userId) {
            throw new Error("User not authorized");
        }

        const recursiveArchive = async(noteId: Id<"notes">) => {
            const children = await ctx.db .query("notes") .withIndex ("by_user_parent", (q) => (
                q .eq("userId", userId) .eq("parentNote", noteId)
            ))
            .collect();
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true,
                });
            await recursiveArchive(child._id);
            }
        }

        const note = await ctx.db.patch(args.id, {
            isArchived: true
        });

        recursiveArchive(args.id);
        
        return note;
    }
})

export const getSidebar = query({

    args: {
        parentNote: v.optional(v.id("notes"))
    },
    handler: async(ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        const notes = await ctx.db .query("notes") 
            .withIndex("by_user_parent", (q) => q .eq("userId", userId) .eq("parentNote", args.parentNote))
            .filter((q) => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect();
        return notes;
    }
});

export const create = mutation ({
    args: {
        title: v.string(),
        parentNote: v.optional(v.id("notes")),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("User not authtenticated");
        }
        const userId = identity.subject;

        const note = await ctx.db.insert("notes", {
            title: args.title,
            parentNote: args.parentNote,
            userId,
            isArchived: false
        });
        return note;
    }
});

export const getTrash = query({
    handler: async(ctx) => {

        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("User not authenticated");
        }
        const userId = identity.subject;

        const notes = await ctx.db .query("notes")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isArchived"), true))
            .order("desc")
            .collect();
        return notes;
    }
});

export const restore = mutation({
    args: {id: v.id("notes")},
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity()

        const options: Partial<Doc<"notes">> = {
            isArchived: false
        };

        const recursiveRestore= async(noteId: Id<"notes">) => {
            const children = await ctx.db .query("notes") .withIndex ("by_user_parent", (q) => (
                q .eq("userId", userId) .eq("parentNote", noteId)
            ))
            .collect();
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: false,
                });
            await recursiveRestore(child._id);
            }
        }

        if(!identity){
            throw new Error("User not authenticated");
        }
        const userId = identity.subject; 

        const existingNote = await ctx.db.get(args.id);

        if(!existingNote) {
            throw new Error("Note not found");
        }

        if(existingNote.userId !== userId){
            throw new Error("User not authorized");
        }

        if(existingNote.parentNote)
            {
            const parent = await ctx.db.get(existingNote.parentNote);
            if (parent?.isArchived) {
                options.parentNote = undefined;
            }
        }
        const note = await ctx.db.patch(args.id, options);

        recursiveRestore(args.id);

        return note;
    }
})

export const remove = mutation({
    args: {id: v.id("notes")},
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity()

        if(!identity){
            throw new Error("User not authenticated");
        }
        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.id);

        if(!existingNote) {
            throw new Error("Note not found");
        }

        if(existingNote.userId !== userId){
            throw new Error("User not authorized");
        }
        
        const note = await ctx.db.delete(args.id);
        return note;
    }    
})

export const getSearch = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("User not authenticated");

        const userId = identity.subject;

        const notes = await ctx.db
        .query("notes")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .filter((q) => q.eq(q.field("isArchived"), false))
        .order("desc")
        .collect();

        return notes;
    },
  });