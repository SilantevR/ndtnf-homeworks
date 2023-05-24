(() => {
  const socket = io.connect("http://localhost:3000");

  socket.emit(
    "addComment",
    {
      bookId: "12345678",
      comment: "test1",
      user: {
        id: "12312345",
        name: "test123",
      },
    },
    (answer) => {
      console.log(answer);
    }
  );
  socket.emit(
    "getAllComments",
    {
      id: "123456789",
    },
    (answer) => {
      console.log(answer);
    }
  );
  socket.emit(
    "findUserComments",
    {
      name: "test123",
    },
    (answer) => {
      console.log(answer);
    }
  );
  socket.emit(
    "updateComment",
    {
      id: "646cf9a3b913aac2bab3de72",
      bookId: "12345678",
      comment: "test1hsafbkasjbOUSBOUASDBGUuogfOHog4whofhaeoufgoa",
      user: {
        id: "12312345",
        name: "test123",
      },
    },
    (answer) => {
      console.log(answer);
    }
  );
  socket.emit(
    "removeComment",
    {
      id: "646cf9a3b913aac2bab3de72",
    },
    (answer) => {
      console.log(answer);
    }
  );
  socket.on("error-info", console.log);
})();
