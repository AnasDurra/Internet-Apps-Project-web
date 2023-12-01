import { apiSlice } from '../apiSlice';
import io from 'socket.io-client';

export const folders = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation({
      query: (data) => ({
        url: 'folders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Folder'],
   
    }),

    getFolders: builder.query({
      query: () => ({
        url: 'folders',
        method: 'GET',
      }),
      providesTags: ['Folder'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io('localhost:8000/folders');
        console.log('socket', socket);

        try {
          await cacheDataLoaded;

          const folderCreationListener = (message) => {
            console.log('socket', message);
            updateCachedData((draft) => {
              draft.push(message);
            });
          };

          const folderUpdateListener = (message) => {
            console.log('socket', message);

            const updatedFolder = message;

            updateCachedData((draft) => {
              const existingIndex = draft.findIndex(
                (folder) => folder.id === updatedFolder.id
              );

              if (existingIndex !== -1) {
                draft[existingIndex] = updatedFolder;
              }
              draft.push(message);
            });
          };

          const folderDeleteListener = (message) => {
            console.log('socket', message);

            const deletedFolderId = message;

            updateCachedData((draft) => {
              const deletedIndex = draft.findIndex(
                (folder) => folder.id === deletedFolderId
              );

              if (deletedIndex !== -1) {
                draft.splice(deletedIndex, 1);
              }
            });
          };

          socket.on('folderCreated', folderCreationListener);
          socket.on('folderUpdated', folderUpdateListener);
          socket.on('folderDeleted', folderDeleteListener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    updateFolder: builder.mutation({
      query: (data) => ({
        url: `folders/${data.id}`,
        method: 'PATCH',
        body: { ...data, id: undefined },
      }),
      invalidatesTags: ['Folder'],
    }),

    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `folders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folder'],
    }),
  }),
});

export const {
  useLazyGetFoldersQuery,
  useGetFoldersQuery,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
} = folders;
