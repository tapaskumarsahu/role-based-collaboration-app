// Utility to send notifications to users via Socket.IO
export const sendNotification = (io, userIds, notification) => {
  userIds.forEach((userId) => {
    io.to(userId).emit("notification", notification);
  });
};
