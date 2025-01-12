import "./index.css";
import "./App.css";

import LeftPanel from "./components/layouts/LeftPanel/LeftPanel.jsx";
import Body from "./components/layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";

import { useLocalStorage } from "./hooks/use-localstorage.hooks.js";
import { UserContext } from "./context/user.context.js";
import { useState } from "react";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
  const [items, setItems] = useLocalStorage("data");
  const [userId, setUserId] = useState(1);

  const addItem = (item) => {
    setItems([
      ...mapItems(items),
      {
        post: item.post,
        title: item.title,
        date: new Date(item.date),
        id: items?.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList items={mapItems(items)} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} />
        </Body>
      </div>
    </UserContext.Provider>
  );
}

export default App;
