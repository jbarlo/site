const projects: {
  id: string;
  label: string;
  description?: string;
  // lastUpdated: Date;
  imgUrl: string;
  imgAlt: string;
  github?: string;
}[] = [
  {
    id: "site",
    label: "Site",
    // lastUpdated: new Date(),
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg",
    imgAlt: "a test dog",
  },
  {
    id: "testdog",
    label: "test dog please ignore",
    // lastUpdated: new Date(),
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg",
    imgAlt: "a test dog",
  },
];

export default projects;
