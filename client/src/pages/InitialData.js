const initialData = {
  cards: {
    "card-1": {
      id: "card-1",
      title: "Study Math",
      deadline: "07/04/2020",
      tag: "green",
      description: "lorem ipsum"
    },
    "card-2": {
      id: "card-2",
      title: "Go to School",
      deadline: "07/04/2020",
      tag: "green",
      description: "lorem ipsum"
    },
    "card-3": {
      id: "card-3",
      title: "Do your Homework",
      deadline: "07/04/2020",
      tag: "green",
      description: "lorem ipsum"
    },
    "card-4": {
      id: "card-4",
      title: "Eat your veggies",
      deadline: "07/04/2020",
      tag: "green",
      description: "lorem ipsum"
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Backlog",
      cardIds: ["card-1", "card-2", "card-3", "card-4"]
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      cardIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Review",
      cardIds: []
    },
    "column-4": {
      id: "column-4",
      title: "Completed",
      cardIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"]
};

export default initialData;
