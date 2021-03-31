const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputMobile = document.getElementById("mobile");
const tableBody = document.querySelector("#example tbody");

const submit = document.getElementById("submit_btn");
const con_edit = document.getElementById("edit_btn");

class Employee{
    constructor(id,name,email,mobile){
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }
    showData(){
        const trElement = document.createElement("tr");
        Employee.addTrow(this.id,this.name,this.email,this.mobile);
        return this;
    }
    storeEmployee(){
        const data = JSON.parse(localStorage.getItem("employess")) ??[];
        data.push({id:this.id, name:this.name, email:this.email, mobile:this.mobile});
        localStorage.setItem("employess",JSON.stringify(data));
    }
    static showOldEmployess(){
      if(localStorage.getItem("employess")){
          JSON.parse(localStorage.getItem("employess")).forEach(element => {
            Employee.addTrow(element.id,element.name,element.email,element.mobile);
              
          });
      }  

    }
    updateEmployee(id){
        const newItem = {id:+id,name:this.name, email:this.email, mobile:this.mobile};
        const updatedData = JSON.parse(localStorage.getItem("employess")).map((item)=> {
            if(item.id == id){
                return newItem;
            }
            return item;
        })
        localStorage.setItem("employess",JSON.stringify(updatedData));
    }

    static addTrow(id,name,email,mobile){
        const trElement = document.createElement("tr");
            trElement.innerHTML = `
                                    <tr>
                                        <td>${name}</td>
                                        <td>${email}</td>
                                        <td>${mobile}</td>
                                        <td>
                                            <button class="btnEdit" data_id=${id} >edit</button>
                                            <button class="btnDelete" data_id=${id} >delete</button>
                                        </td>
                                    </tr>`;
            tableBody.appendChild(trElement);
    }
}

Employee.showOldEmployess();

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(!con_edit.value){
        let id = Math.floor(Math.random() * 100000);
        newEmployee = new Employee(id ,inputName.value ,inputEmail.value,inputMobile.value);
        newEmployee.showData().storeEmployee();
        inputName.value="";
        inputEmail.value="";
        inputMobile.value="";
    }
    else{
        const id = con_edit.value;
        newEmployee = new Employee(id ,inputName.value ,inputEmail.value,inputMobile.value);
        newEmployee.updateEmployee(id);
        submit.value="Submit";
        tableBody.value="";
        Employee.showOldEmployess;

    }
    
})

tableBody.addEventListener("click",(e)=> {
    //delete btn
    //remove from local storage and set new local data
    if(e.target.classList.contains("btnDelete")){
        let id = e.target.getAttribute("data_id");
        let emps = JSON.parse(localStorage.getItem("employess"));
        let newData = emps.filter(item => item.id !== +id );
        localStorage.setItem("employess",JSON.stringify(newData));
    //remove from html
        e.target.parentElement.parentElement.remove();
    }
    //edit btn
    if(e.target.classList.contains("btnEdit")){
        let id = e.target.getAttribute("data_id");
        let item = JSON.parse(localStorage.getItem("employess")).find(item => item.id === +id);
        inputName.value=item.name;
        inputEmail.value=item.email;
        inputMobile.value=item.mobile;
        con_edit.value = item.id;
        submit.value = "Edit the item";
    }


})