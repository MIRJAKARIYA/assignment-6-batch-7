const loadAllData = (datesort,show) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => showCards(data.data.tools,datesort,show));
};

const showCards = (data,datesort,show) => {
  console.log(data);
  const cards_container = document.getElementById("cards-container");
  cards_container.innerHTML = ""
  if(datesort){
    data.sort((a,b)=> new Date(a.published_in).getTime() - new Date(b.published_in).getTime())
  }

  if(!show){
    data = data.slice(0,6)
    document.getElementById("show-all-btn").classList.remove("hidden")
  }
  else{
    document.getElementById("show-all-btn").classList.add("hidden")
  }



  data.forEach((singleData) => {
    let cardFeatures = document.createElement("ol");
    cardFeatures.classList.add("list-decimal", "mx-auto");
    singleData.features.forEach((fea) => {
      const li = document.createElement("li");
      li.innerText = fea;
      cardFeatures.appendChild(li);
    });

    const cardParent = document.createElement("div");
    cardParent.classList.add("card", "bg-base-100", "shadow-xl");
    cardParent.innerHTML = `
    <figure class="px-10 pt-10">
    <img src="${singleData.image}" alt="Shoes" class="rounded-xl" />
  </figure>
    ${cardFeatures.outerHTML}
    <hr>

    <div class="flex justify-between items-center">
        <div>
            <p>${singleData.name}</p>
            <p>${singleData.published_in}</p>
        </div>
        <div>
        <label onclick="showSingleDetailsFetch('${singleData.id}')" for="my-modal-5" class="btn">open modal</label>
        </div>

    </div>
  `;

    cards_container.appendChild(cardParent);
  });
};

const showSingleDetailsFetch = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => showModalData(data.data));
};

const showModalData = (data) => {
  console.log(data)
 

  const featuresUl = document.createElement("ul")
  featuresUl.classList.add("list-disc")
  for(let key in data.features){
    const li = document.createElement("li")
    li.innerText = data.features[key]["feature_name"]
    featuresUl.appendChild(li)
  }

  let dataIntregations = data.integrations;  
  const intreGationsUl = document.createElement("ul")
  intreGationsUl.classList.add("list-disc")
  if(dataIntregations){
    dataIntregations.forEach(intre => {
      const li = document.createElement("li")
      li.innerText = intre
      intreGationsUl.appendChild(li)
    })
  }

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  
  <div class="flex justify-center">
    <div class="w-[45%]">
      <p>${data.description}</p>

      <div class="flex justify-between">
        <p>
            
        ${
          data.pricing
            ? data.pricing[0].price === "No cost"
              ? "free of cost"
              : data.pricing[0].price
            : "not found"
        } ${data.pricing ? data.pricing[0].plan : "not found"}
        
        
        </p>
        <p>${
          data.pricing
            ? data.pricing[1].price === "No cost"
              ? "free of cost"
              : data.pricing[1].price
            : "not found"
        } ${data.pricing ? data.pricing[1].plan : "not found"}</p>
        <p>${
          data.pricing
            ? data.pricing[2].price === "No cost"
              ? "free of cost"
              : data.pricing[2].price
            : "not found"
        } ${data.pricing ? data.pricing[2].plan : "not found"}</p>


      </div>

      <div class="flex justify-between">
        <div class="w-[45%]">
         <h1 class="text-4xl font-bold">Features</h1>
          ${featuresUl.outerHTML}
        </div>
        <div class="w-[45%]">
          <h1 class="text-4xl font-bold">Intregrations</h1>
          ${dataIntregations?intreGationsUl.outerHTML:"<p>No data found</p>"}
        </div>
      </div>
    </div>
    <div class="w-[45%]">
        <div>
          <img src="${data.image_link[0]}" />
        </div>
        <div>
          <p>${data.input_output_examples?data.input_output_examples[0].input:"Can you give any example?"}</p>
          <p>${data.input_output_examples?data.input_output_examples[0].output:"No! Not Yet! Take a break!!!"}</p>
        </div>
    </div>
  
  </div>




  <div class="modal-action">
        <label for="my-modal-5" class="btn">Yay!</label>
      </div>
  
  `;
};
let isSorted = false;
let isShow = false
//dateSortButton
document.getElementById("date-sort-btn").addEventListener("click",()=>{
  isSorted = true
  loadAllData(true,isShow);
})

//show all button
document.getElementById("show-all-btn").addEventListener("click",()=>{
  isShow = true;
  loadAllData(isSorted, true);
})

loadAllData();
