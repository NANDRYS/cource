import "./index.css";
import "./App.css";

// import Button from "./components/Button/Button.jsx";
import CardButton from "./components/CardButton/CardButton.jsx";
import JournalItem from "./components/JournalItem/JournalItem.jsx";
import LeftPanel from "./components/layouts/LeftPanel/LeftPanel.jsx";
import Body from "./components/layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";

function App() {
  const data = [
    {
      title: "Подготовка к обновлению курсов",
      text: "Горные походы открывают удивительные природные ландшафты!",
      date: new Date(),
    },
    {
      title: "gпоход в горы",
      text: "Думал, что очень много времени",
      date: new Date(),
    },
    {
      title: "gпоход в горы",
      text: "Думал, что очень много времени",
      date: new Date(),
    },
  ];

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          {data.map((el) => (
            <CardButton>
              <JournalItem title={el.title} text={el.text} date={el.date} />
            </CardButton>
          ))}

          {/* <CardButton>
            <JournalItem
              title={data[1].title}
              text={data[1].text}
              date={data[1].date}
            />
          </CardButton> */}
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm />
      </Body>
    </div>
  );
}

export default App;
