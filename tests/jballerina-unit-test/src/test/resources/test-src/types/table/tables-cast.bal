type Person record {
    readonly string name;
    readonly int age;
    string country;
};

type Teacher record {
    readonly string name;
    readonly int age;
    string school;
};

type Customer record {
    readonly int id;
    readonly string name;
    string lname;
};

type CustomerTable table<Customer|Teacher>;

type PersonTable1 table<Person|Customer> key<string>;

type PersonTable2 table<Person|Teacher> key<string|int>;

PersonTable1 tab1 = table key(name) [
    { name: "AAA", age: 31, country: "LK" },
    { name: "BBB", age: 34, country: "US" }
    ];

PersonTable2 tab2 = table key(age) [
    { name: "AAA", age: 31, country: "LK" },
    { name: "BBB", age: 34, country: "US" },
    { name: "BBB", age: 33, school: "MIT" }
    ];

CustomerTable tab3 = table key(name) [
    { id: 13 , name: "Foo", lname: "QWER" },
    { id: 13 , name: "Bar" , lname: "UYOR" }
    ];

function testKeyConstraintCastToString1() returns boolean {
    table<Person> key<string> tab =<table<Person> key<string>> tab1;
    return tab["AAA"]["name"] == "AAA";
}

function testKeyConstraintCastToString2() returns boolean {
    table<Customer> key(name) tab =<table<Customer> key(name)> tab3;
    return tab["Foo"]["name"] == "Foo";
}

//function testKeyConstraintCastToString2() returns boolean {
//    table<Person> key<int> tab =<table<Person> key<int>> tab2;
//    return tab[31]["name"] == "AAA";
//}
