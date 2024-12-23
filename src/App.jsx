import "./index.css";
import "./App.css";


import LeftPanel from "./components/layouts/LeftPanel/LeftPanel.jsx";
import Body from "./components/layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import { useState } from "react";

function App() {
  const INITIAL_DATA = [
    // {
    //   id: 1,
    //   title: "Подготовка к обновлению курсов",
    //   text: "Горные походы открывают удивительные природные ландшафты!",
    //   date: new Date(),
    // },
    // {
    //   id: 2,
    //   title: "gпоход в горы",
    //   text: "Думал, что очень много времени",
    //   date: new Date(),
    // },
  ];

  const [items, setItems] = useState(INITIAL_DATA);
  
  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
        id: Math.max(...(oldItems.map((i) => i.id) + 1)),
      },
    ]);
  };



  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
