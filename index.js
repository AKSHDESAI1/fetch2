const getdata = document.getElementById("getdata");
const img = document.getElementById("img");

const getDataFunc = async () => {
  try {
    // img.classList.add("d-none");
    console.log(1);
    const res1 = await fetch('https://aksh5.herokuapp.com/student');
    const res = await fetch('https://aksh5.herokuapp.com/student');
    const data = await res.json();
    const arr = [];
    data.map((item) => {
      arr.push(item);
    })
    console.log('data', data);
    console.log('arr', arr);
    let str = ""
    arr.forEach(async (item) => {
      const cat1 = await fetch("https://api.thecatapi.com/v1/images/search");
      const cat2 = await cat1.json();
      const img1 = cat2[0].url
      str += `
            <div class="col-md-4 text-center my-1">
          <div class="card" style="">
            <img src=${img1} class="card-img-top img-thumbnail img-fluid" style="min-height: 250px; max-height: 250px" alt="cat pics" />
            <div class="card-body">
              <h5 class="card-title text-center">${item.title}</h5>
              <p class="card-text text-center">
              ${item.desc}
              </p>
              <button id=${item._id} class="btn btn-primary">Edit</button>
              <a href="#" id=${item._id} class="btn btn-danger" onclick="deleteData(this.id)">Delete</a>
            </div>
          </div>
        </div>
        
            `
      getdata.innerHTML = str;
    })
  } catch (error) {
    console.log('error', error);
  }
}

const deleteData = async (id) => {
  getdata.innerHTML = `<div id="img" class="text-center">
  <img src="/fetch2/img/loading.gif" alt="">
</div>`
  try {
    const res = await fetch(`https://aksh5.herokuapp.com/student/${id}`, {
      method: 'DELETE',
      body: id
    })
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log('err', error);
  }
  getDataFunc()
}

const handleForm = async (e) => {
  getdata.innerHTML = `<div id="img" class="text-center">
  <img src="/fetch2/img/loading.gif" alt="">
</div>`
  let title1 = document.getElementById("title").value;
  let desc1 = document.getElementById("desc").value;
  try {
    const res = await fetch("https://aksh5.herokuapp.com/student", {
      method: "POST",
      body: JSON.stringify({
        title: title1,
        desc: desc1
      }),
      headers: {
        'Content-Type': "application/json"
      }
    });
    const data = await res.json();
    console.log('data1', data);
    getDataFunc()
  } catch (error) {
    console.log(error);
  }
}
console.log(111);
getDataFunc();
// getdata.addEventListener('click', getDataFunc);
