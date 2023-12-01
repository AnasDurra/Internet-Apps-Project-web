import { apiSlice } from '../apiSlice';
import io from 'socket.io-client';

export const files = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFile: builder.mutation({
      query: (data) => ({
        url: 'files',
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags: ['files'],
    }),

    getFilesInFolder: builder.query({
      query: (folder_id) => ({
        url: `files/all/?folder_id=${folder_id}`,
        method: 'GET',
      }),
      providesTags: ['files'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io('localhost:8000/files');
        console.log('socket', socket);

        try {
          await cacheDataLoaded;

          const filesCreationListener = (message) => {
            console.log('socket', message);
            updateCachedData((draft) => {
              draft.push(message);
            });
          };

          const filesUpdateListener = (message) => {
            console.log('socket', message);

            const updatedFile = message;

            updateCachedData((draft) => {
              const existingIndex = draft.findIndex(
                (files) => files.id === updatedFile.id
              );

              if (existingIndex !== -1) {
                draft[existingIndex] = updatedFile;
              }
              draft.push(message);
            });
          };

          const filesDeleteListener = (message) => {
            console.log('socket', message);

            const deletedFileId = message;

            updateCachedData((draft) => {
              const deletedIndex = draft.findIndex(
                (files) => files.id === deletedFileId
              );

              if (deletedIndex !== -1) {
                draft.splice(deletedIndex, 1);
              }
            });
          };

          const filesCheckedInListener = (message) => {
            console.log('socket', message);

            const checkedInFileId = message.file_id;

            updateCachedData((draft) => {
              const checkedInIndex = draft.findIndex(
                (files) => files.id === checkedInFileId
              );

              if (checkedInIndex !== -1) {
                draft[checkedInIndex].FilesStatus.status_id = 1; //TODO
              }
            });
          };

          const filesCheckedOutListener = (message) => {
            console.log('socket', message);

            const checkedOutFileId = message.file_id;

            updateCachedData((draft) => {
              const checkedOutIndex = draft.findIndex(
                (files) => files.id === checkedOutFileId
              );

              if (checkedOutIndex !== -1) {
                draft[checkedOutIndex].FilesStatus.status_id = 2; //TODO also user object
              }
            });
          };

          socket.on('fileCreated', filesCreationListener);
          socket.on('fileUpdated', filesUpdateListener);
          socket.on('fileDeleted', filesDeleteListener);
          socket.on('fileCheckedIn', filesCheckedInListener);
          socket.on('fileCheckedOut', filesCheckedOutListener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    updateFile: builder.mutation({
      query: (file) => ({
        url: `files/${file.id}`,
        method: 'PATCH',
        body: { ...file, id: undefined },
      }),
      invalidatesTags: ['files'],
    }),

    deleteFile: builder.mutation({
      query: (file_id) => ({
        url: `files/${file_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['files'],
    }),

    checkInFiles: builder.mutation({
      query: (ids) => {
        console.log('ids', ids);
        return {
          url: `files/checkIn`,
          method: 'POST',
          body: { file_id: ids },
        };
      },
      invalidatesTags: ['files'],
    }),

    checkOutFile: builder.mutation({
      query: (id) => {
        console.log('ids', id);
        return {
          url: `files/checkOut`,
          method: 'POST',
          body: { file_id: id },
        };
      },
      invalidatesTags: ['files'],
    }),
  }),
});

export const {
  useLazyGetFilesInFolderQuery,
  useGetFilesInFolderQuery,
  useCreateFileMutation,
  useDeleteFileMutation,
  useUpdateFileMutation,
  useCheckInFilesMutation,
  useCheckOutFileMutation,
} = files;
