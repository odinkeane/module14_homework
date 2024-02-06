const XMLString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;
const parser = new DOMParser();
const XMLDOM = parser.parseFromString(XMLString, 'text/xml');
const names = XMLDOM.querySelectorAll("name");
const firstNames = XMLDOM.querySelectorAll("first");
const secondNames = XMLDOM.querySelectorAll("second");
const ages = XMLDOM.querySelectorAll("age");
const profes = XMLDOM.querySelectorAll("prof");
let list = [];
for (let i=0; i<names.length; i++){
    list.push({
        name: `${firstNames[i].textContent} + ${secondNames[i].textContent}`,
        age: Number(ages[i].textContent),
        prof: profes[i].textContent,
        lang: names[i].getAttribute("lang")
    });
}

console.log(list);