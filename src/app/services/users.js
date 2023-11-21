import { apiSlice } from '../apiSlice';

export const folders = apiSlice.injectEndpoints({
  tagTypes: ['Folder'],

  endpoints: (builder) => ({
    create: builder.query({
      query: (data) => ({
        url: 'folders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Folder'],
    /*   async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket('ws://localhost');
        try {
          await cacheDataLoaded;

          const folderCreationListener = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
              case 'notifications': {
                updateCachedData((draft) => {
                  draft.push(...message.payload);
                });
                break;
              }
              default:
                break;
            }
          };

          const folderUpdateListener = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
              case 'update': {
                const updatedFolder = message.payload;

                updateCachedData((draft) => {
                  const existingIndex = draft.findIndex(
                    (folder) => folder.id === updatedFolder.id
                  );

                  if (existingIndex !== -1) {
                    draft[existingIndex] = updatedFolder;
                  }
                  draft.push(...message.payload);
                });
                break;
              }
              default:
                break;
            }
          };

          const folderDeleteListener = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
              case 'delete': {
                // Assuming that the payload contains the ID of the folder to be deleted
                const deletedFolderId = message.payload;

                // Update cached data or perform any other necessary actions
                updateCachedData((draft) => {
                  // Find the index of the folder to be deleted
                  const deletedIndex = draft.findIndex(
                    (folder) => folder.id === deletedFolderId
                  );

                  if (deletedIndex !== -1) {
                    // Remove the folder from the cache
                    draft.splice(deletedIndex, 1);
                  }
                  // If the folder doesn't exist in the cache, you might choose to handle it differently
                });
                break;
              }
              default:
                break;
            }
          };

          ws.addEventListener('folderCreated', folderCreationListener);
          ws.addEventListener('folderUpdated', folderUpdateListener);
          ws.addEventListener('folderDeleted', folderDeleteListener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        ws.close();
      }, */
    }),

    get: builder.query({
      query: () => ({
        url: 'folders',
        method: 'get',
      }),
      providesTags: ['Folder'],
    }),

    update: builder.mutation({
      query: (data) => ({
        url: `folders/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Folder'],
    }),

    delete: builder.mutation({
      query: (id) => ({
        url: `folders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folder'],
    }),
  }),
});

export const {
  useCreateQuery,
  useDeleteMutation,
  useGetQuery,
  useLazyCreateQuery,
  useLazyGetQuery,
  useUpdateMutation,
} = folders;
