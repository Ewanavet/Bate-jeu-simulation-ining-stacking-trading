const FarmScreen = document.getElementById("FarmScreen");
const ConterFarms = document.getElementById("NbsframsH4");
const electricityCost = 0.19;
const ETHprice = 3000;
constStats.querySelector("span").textContent = electricityCost + "$/kWh";
constStats.querySelector("strong").textContent = "1 ETH = " + ETHprice + "$";

// initialisation
let soldeSpan = document.querySelectorAll(".soldeHTML");
let solde = 1000000;

let hashrateTT = 0;
let consoTT = 0;
let valeurTT = 0;

let ETHmine = 0;
let Wttconso = 0;
let interval = 100;

let ETH = 0;
let BTC = 0;
let FLUX = 0;
let NbsFamrs = 0;

// let apiKey = {
//   key: "ca78d6cc-e028-463e-9334-3dcb2685d54d",
// };

// async function getMarketData() {
//   const result = await axios.get(
//     "https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical?symbol=ETH",
//     {
//       headers: {
//         "X-CMC_PRO_API_KEY": apiKey.key,
//       },
//     }
//   );
//   return await result.data.data.ETH;
// }

// console.log(getMarketData());

const addMessage = (message) => {
  if (log.querySelector("div")) {
    log.querySelector("div").remove();
  }
  let messageDiv = document.createElement("div");
  messageDiv.classList.add("messageDiv");
  messageDiv.textContent = message;
  log.appendChild(messageDiv);
};

// add GPUs list
const data = {
  RTX_3090: {
    hashrate: 121.16,
    prix: 1620,
  },
  RTX_3080: {
    hashrate: 97.88,
    prix: 1512,
  },
  RTX_3070: {
    hashrate: 61.79,
    prix: 1080,
  },
};

const dataName = ["RTX_3090", "RTX_3080", "RTX_3070", "GTX_1080"];
const dataHashrate = [121.16, 97.88, 61.79, 35.16];
const dataPrix = [1620, 1512, 1080, 540];
const dataCons = [350, 320, 220, 180];
const ListeGPU = document.getElementById("ShopGpuPlace");

for (let i = 0; i < dataName.length; i++) {
  const addGpuInList = document.createElement("div");
  addGpuInList.innerHTML = `
  <input type="radio" name="gpu" id="${dataName[i]}" class="${i}" checked>
  <label for="gpu">${dataName[i]} | <strong class="MH/sBalise">${dataHashrate[i]}</strong><i>MH/S</i> ${dataCons[i]}W <span class="PrixGpuBalise1">${dataPrix[i]}</span>$</label>
  `;
  ListeGPU.appendChild(addGpuInList);
}

const selectedGPU = () => {
  let gpuSelected = document.querySelector('input[name="gpu"]:checked');

  if (gpuSelected === null) {
    addMessage("Selectionnez un gpu");
  } else {
    gpuNbs = Number(gpuSelected.classList.value);
    return gpuNbs;
  }
};

// date 1s = 2h
const calculerDate = () => {
  let hr = 0;
  setInterval(
    (heureEnJoursHeures = () => {
      hr = hr + 1;
      let jours = Math.floor(hr / 24);
      let Heures = hr % 24;
      document.querySelector(".dateJour").textContent = jours + "D";
      document.querySelector(".dateHeure").textContent = Heures + "H";
    }),
    interval / 2
  );
};
calculerDate();

// all updates
const updateInfosTT = () => {
  let tt = 0;
  // calculer le raport de temps
  dateStats.textContent = interval / 1000 + "s = " + 2 + "H";

  // calculer tt de hashrate
  let L = [];
  a = document.querySelectorAll(".mhStrong");
  for (var i = 0; i < a.length; ++i) {
    L.push(a.item(i));
  }
  for (let i = 0; i < L.length; i++) {
    tt = Number(eval(tt + Number(L[i].innerHTML)).toFixed(2));
  }
  hashrateTT = tt;
  document.getElementById("hashrateTT").textContent = hashrateTT + "MH/s";
  hsStats.querySelector("span").textContent = hashrateTT + "MH/s";
  let dolpardayHs = (hashrateTT * 0.00001295 * ETHprice).toFixed(2);
  hsStats.querySelector("strong").textContent = dolpardayHs + "$/day";

  // calculer tt de conso
  L = [];
  tt = 0;
  a = document.querySelectorAll(".consSpan");
  for (var i = 0; i < a.length; ++i) {
    L.push(a.item(i));
  }
  for (let i = 0; i < L.length; i++) {
    tt = Number(eval(tt + Number(L[i].innerHTML)).toFixed(2));
  }
  consoTT = tt;
  document.getElementById("ValeureTT").textContent = consoTT + "w";
  consoStats.querySelector("span").textContent = consoTT + "W";
  let dolpardayConso = ((consoTT / 1000) * 24 * electricityCost).toFixed(2);
  consoStats.querySelector("strong").textContent = dolpardayConso + "$/day";

  // calculer tt de la valeur de la farm
  L = [];
  tt = 0;
  a = document.querySelectorAll(".prixHtml");
  for (var i = 0; i < a.length; ++i) {
    L.push(a.item(i));
  }
  for (let i = 0; i < L.length; i++) {
    tt = Number(eval(tt + Number(L[i].innerHTML)).toFixed(2));
  }
  valeurTT = tt;
  document.getElementById("ConsoTT").textContent = valeurTT + "$";

  let ttparDay = (dolpardayHs - dolpardayConso).toFixed(2);
  let ttparMonth = (ttparDay * 30.5).toFixed(2);
  ttStats.querySelector("strong").textContent =
    ttparDay + "$/day | " + ttparMonth + "$/Month";

  ttStats.querySelector("span").textContent =
    ((dolpardayConso / dolpardayHs) * 100).toFixed(2) + "%";
  if (ttStats.querySelector("span").textContent == "NaN%") {
    ttStats.querySelector("span").textContent = "0%";
  }

  // TT ETH miné et W consomé
  ttethMin.querySelector("span").textContent =
    "total miné : " +
    ETHmine.toFixed(6) +
    "ETH" +
    " (" +
    (ETHmine * ETHprice).toFixed(2) +
    "$)";
  ttethMin.querySelector("strong").textContent =
    "Consomation : " + Wttconso.toFixed(2) + "$";

  // RSI stats
  rsiStats.querySelector("span").textContent =
    Math.floor(valeurTT / ttparDay) + " days before profitability";
  if (
    rsiStats.querySelector("span").textContent ==
    "NaN days before profitability"
  ) {
    rsiStats.querySelector("span").textContent = "No GPU";
  }
  // console.log("updateInfosTT");
};
updateInfosTT();

const updateSolde = () => {
  for (i of soldeSpan) {
    i.textContent = solde.toFixed(2);
  }
  let dolpardayConso = (consoTT / 1000) * 24 * electricityCost;
  solde = solde - dolpardayConso / 12;
  soldeTTdeTout.innerHTML = (solde + ETH.toFixed(6) * ETHprice).toFixed(2);
};
updateSolde();

const updateWallet = () => {
  scr3contenu.querySelector(".soldeETH").textContent = ETH.toFixed(6);
  ETHWallet = scr3contenu.querySelector(".soldeETH").textContent;

  scr3contenu.querySelector(".soldeBTC").textContent = BTC;
  BTCWallet = scr3contenu.querySelector(".soldeBTC").textContent;

  scr3contenu.querySelector(".soldeFLUX").textContent = FLUX;
  FLUXWallet = scr3contenu.querySelector(".soldeFLUX").textContent;

  updateSolde();
};
updateWallet();

document.addEventListener("click", () => {
  updateInfosTT();
});

const miner = (crypto) => {
  if (crypto == "ETH") {
    setInterval(
      (MinETH = () => {
        let dolpardayConso = (consoTT / 1000) * 24 * electricityCost;
        ETH = ETH + (0.00001295 / 12) * hashrateTT;
        ETHmine = ETHmine + (0.00001295 / 12) * hashrateTT;

        Wttconso = Wttconso + dolpardayConso / 12;
        updateWallet();
        updateInfosTT();
      }),
      interval
    );
  }
};
miner("ETH");

function removeFarm(NbsFamrs) {
  const ttValeureFarm = Number(
    document.querySelector(".prixHtml" + NbsFamrs).textContent
  );
  const ttMHsFarm = Number(
    document.querySelector(".mhStrong" + NbsFamrs).textContent
  );
  const ttConsoFarm = Number(
    document.querySelector(".consSpan" + NbsFamrs).textContent
  );
  console.log(ttValeureFarm, ttMHsFarm, ttConsoFarm);

  solde = solde + (ttValeureFarm - ttValeureFarm * 0.05);
  updateSolde();
  let farmToRemove = document.querySelector(".farmSpan" + NbsFamrs);
  farmToRemove.remove();
  addMessage(
    `Rig n°${NbsFamrs} was sold for ${ttValeureFarm - ttValeureFarm * 0.05}$`
  );

  // valeurTT = valeurTT - ttValeureFarm;
  // hashrateTT = hashrateTT - ttMHsFarm;
  // consoTT = consoTT - ttConsoFarm;
  NbsFamrs--;

  // nbs de farms
  let LenghtFarm = document
    .getElementById("FarmScreen")
    .querySelectorAll(".farmSpan").length;
  ConterFarms.textContent = LenghtFarm;
}

const addFarm = () => {
  if (solde > 1000) {
    solde = solde - 600;
    updateSolde();
    addFarmBtn.style.background = "rgb(0, 247, 0)";
    // +1 at conter of farms
    let LenghtFarm =
      document.getElementById("FarmScreen").querySelectorAll(".farmSpan")
        .length + 1;

    // nbs de farms
    ConterFarms.textContent = LenghtFarm;

    // NbsFamrs++;
    NbsFamrs++;

    // name of farm id = "farmSpan" + NbsFamrs class = "farmSpan"
    const farm = document.createElement("div");
    farm.classList.add("farmSpan" + NbsFamrs, "farmSpan");
    farm.style.backgroundColor = "darkgrey";

    // create button suppr id = "SupprFarlBtn" + NbsFamrs class = "SupprFarlBtn"
    farm.innerHTML = `
    <div class="leftFarm">
      <button class="BtnFarm BtnDel" onclick="removeFarm(${NbsFamrs})">Del</button>
      <p style="margin:0px" "margin-right=10px">${NbsFamrs}</p>
      <div class="placeForGPUbtn${NbsFamrs}">
        <button class="BtnGPU ${NbsFamrs}" style="background-color: rgb(0, 247, 0)" onclick="addGPU(${NbsFamrs})">+ GPU</button>
      </div>
      <div class="placeForGPU" id="placeForGPU${NbsFamrs}"></div>
      </div>
      <div class="rightFarm">
      <div class="mh ${NbsFamrs}">
        <strong class="GIFcontener"><img src="./img/ewan_logo_animer_simulateur_minage.gif" class="gifminage"></strong>
        <span class="boxInfos"><strong  class="mhStrong${NbsFamrs} mhStrong">0</strong>MH/s | <strong class="consSpan${NbsFamrs} consSpan">0</strong>W <i class="prixHtml${NbsFamrs} prixHtml">600</i>$</span>
      </div>
    </div>`;
    FarmScreen.appendChild(farm);

    // log nbs of conter of farms
    valeurTT = valeurTT + 600;
    addMessage(`Rig ${NbsFamrs} added for 600$`);
    console.log(`Rig ${NbsFamrs} added`);
  } else {
    addFarmBtn.style.background = "red";
  }
};

const addGPU = (NbsFamrs) => {
  // place to add the gpu and the numbers of Gpu in
  const placeForGPU = document.getElementById("placeForGPU" + NbsFamrs);
  // console.log(allInfosMHs);

  let LenghtGPU =
    document.getElementById("placeForGPU" + NbsFamrs).querySelectorAll(".GPU")
      .length + 1;

  // witch gpu ?
  let witchGpu = selectedGPU();
  // console.log(witchGpu);

  // verify if solde > total cost and nbs gpu < 8 and if a gpu is selected

  if (LenghtGPU == 8) {
    console.log("Nbs GPU max (8)");
    btnToRemove = document.querySelector(".BtnGPU", NbsFamrs);
    btnToRemove.remove();
  }
  if (solde > dataPrix[witchGpu] && LenghtGPU <= 8) {
    const GPU = document.createElement("div");
    GPU.classList.add("GPU", "GPU" + NbsFamrs, "LenghtGPU" + LenghtGPU);
    GPU.setAttribute("id", "GPU" + NbsFamrs + LenghtGPU);
    GPU.innerHTML = `
      <span><div class="${NbsFamrs} ${LenghtGPU}0 SellGpuBtn ${dataPrix[witchGpu]} ${dataHashrate[witchGpu]} ${dataCons[witchGpu]}" onclcick="removeFarm(${NbsFamrs})">Sell</div> ${dataName[witchGpu]} : ${dataHashrate[witchGpu]}MH/s, ${dataCons[witchGpu]}W, ${dataPrix[witchGpu]}$</span>
      `;
    placeForGPU.appendChild(GPU);
    console.log(document.querySelector(".BtnGPU", NbsFamrs));

    solde = solde - dataPrix[witchGpu];
    updateSolde();

    // calculer le tt d'hashrate, de la conso et de la valeur
    const updateInfosRig = (NbsFamrs) => {
      // hashrate rig and TT
      const allInfosMHs = document.querySelector(".mhStrong" + NbsFamrs);
      allInfosMHs.textContent = eval(
        Number(allInfosMHs.textContent) + dataHashrate[witchGpu]
      ).toFixed(2);
      // hashrateTT = hashrateTT + dataHashrate[witchGpu];
      // console.log(hashrateTT);

      // valeur rig and tt
      const allInfosPrix = document.querySelector(".prixHtml" + NbsFamrs);
      allInfosPrix.textContent = eval(
        Number(allInfosPrix.textContent) + dataPrix[witchGpu]
      );
      valeurTT = valeurTT + dataPrix[witchGpu];
      // console.log(valeurTT);

      // conso rig and TT
      const allInfosCons = document.querySelector(".consSpan" + NbsFamrs);
      allInfosCons.textContent = eval(
        Number(allInfosCons.textContent) + dataCons[witchGpu]
      );
      // consoTT = consoTT + dataCons[witchGpu];
      // console.log(consoTT);
    };

    // sell the GPU
    GPU.onclick = () => {
      // witch btn press
      const BtnSell = document.getElementsByClassName(
        `${NbsFamrs} ${LenghtGPU}0`
      )[0].classList;

      // witch div with this class
      let gpuToSell = document.getElementsByClassName(
        `GPU GPU${BtnSell[0]} LenghtGPU${BtnSell[1] / 10}`
      )[0];

      // sell price - 5%
      sellPriceGPU = Number(BtnSell[3]) - Number(BtnSell[3]) * 0.05;
      solde = solde + sellPriceGPU;
      updateSolde();
      gpuToSell.remove();

      // uptede info rig
      // update hashrate
      const allInfosMHs = document.querySelector(".mhStrong" + NbsFamrs);
      allInfosMHs.textContent = eval(
        Number(allInfosMHs.textContent) - BtnSell[4]
      ).toFixed(2);
      hashrateTT = eval(hashrateTT - dataHashrate[witchGpu]).toFixed(2);
      // update valeur
      const allInfosPrix = document.querySelector(".prixHtml" + NbsFamrs);
      allInfosPrix.textContent = eval(
        Number(allInfosPrix.textContent) - BtnSell[3]
      );
      valeurTT = valeurTT - dataPrix[witchGpu];
      // update Conso
      const allInfosCons = document.querySelector(".consSpan" + NbsFamrs);
      allInfosCons.textContent = eval(
        Number(allInfosCons.textContent) - BtnSell[5]
      );
      consoTT = consoTT - dataCons[witchGpu];

      // remettre le btn
      const placeBtn = document.querySelector(".placeForGPUbtn" + NbsFamrs);
      // console.log(placeBtn.querySelector("button"));
      if (placeBtn.querySelector("button") == undefined && LenghtGPU <= 8) {
        placeBtn.innerHTML = `
        <button class="BtnGPU ${NbsFamrs}" style="background-color: rgb(0, 247, 0)" onclick="addGPU(${NbsFamrs})">+ GPU</button>
        `;
      }

      // log to confirm
      addMessage(
        `GPU n°${
          BtnSell[1] / 10
        } sell to the price of ${sellPriceGPU}$ (Rig n°${BtnSell[0]}) `
      );

      console.log(
        `GPU n°${
          BtnSell[1] / 10
        } sell to the price of ${sellPriceGPU}$ (Rig n°${BtnSell[0]}) `
      );
    };

    // log to confirm
    console.log(
      dataName[witchGpu] +
        " n°" +
        LenghtGPU +
        " added to the farm : " +
        NbsFamrs
    );
    const BtnSell = document.getElementsByClassName(
      `${NbsFamrs} ${LenghtGPU}0`
    )[0].classList;
    sellPriceGPU = Number(BtnSell[3]);
    addMessage(
      `${dataName[witchGpu]} n° ${LenghtGPU} | ${dataPrix[witchGpu]}$ added to the farm : ${NbsFamrs}`
    );
    updateInfosRig(NbsFamrs);
  } else if (witchGpu === undefined) {
    console.log("solde < prixGpu OR no gpu selected");
  }
  if (solde < dataPrix[witchGpu]) {
    addMessage("insufficient balance !");
  }
};

const addFullFarm = () => {
  console.log("add full farm");
  addFarm();
  for (let i = 0; i < 8; i++) {
    addGPU(NbsFamrs);
  }
};

addFarmBtn.onclick = addFarm;
addFullFarmBtn.onclick = addFullFarm;
