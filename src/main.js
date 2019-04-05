const injHeader = document.getElementById("injuries-header");
injHeader.style.display = "none";
const decisionScreen = document.getElementById("decision-section");
decisionScreen.style.display = "none";
const selectSection = document.getElementById("filter-select");
      selectSection.className = "select-section"
let aDiv = document.createElement("DIV");
const sectionPainting = document.getElementById("pared");
const selectToSort = `
<select id="sort-select">
<option value="ASC">Ascendente</option>
<option value="DSC">Descendente</option>
</select>
`


document.getElementById("go-to-folios").addEventListener("click", () => {
    document.getElementById("first-view").style.display = "none";
    injHeader.style.display = "flex";
    decisionScreen.style.display = "flex";
});

document.getElementById("go-to-by-years").addEventListener("click", () => {
    decisionScreen.style.display = "none";

    const showByYear = (data, sectionPainted) => {
        const newDiv= document.createElement("DIV");
              newDiv.className = "containerA";
        for (let i = 0; i < data.length; i++) {        
            let yearTemp = `
                <article>
                    <p> Año: ${data[i]['Año']} .</p>
                    <p> Tripulantes: ${data[i]['Tripulantes']} .</p>
                    <p> Ciclistas: ${data[i]['Ciclistas']} .</p>
                    <p> Ocupantes de bus: ${data[i]['Ocupantes de bus']} .</p>
                    <p> Motociclistas: ${data[i]['Motociclistas']} .</p>
                    <p> Peatones: ${data[i]['Peatones']} .</p>
                    <p> Pasajeros de auto: ${data[i]['Pasajeros de auto']} .</p>
                </article>
            `
            newDiv.innerHTML += yearTemp;
            sectionPainted.appendChild(newDiv);
        }
      }

    const selectTemplate = `
      <select id="year-select">
        <option value="0">Año</option>
        <option value="1960">1960</option>
        <option value="1965">1965</option>
        <option value="1970">1970</option>
        <option value="1975">1975</option>
        <option value="1980">1980</option>
        <option value="1985">1985</option>
        <option value="1990">1990</option>
        <option value="1995">1995</option>
        <option value="2000">2000</option>
        <option value="2001">2001</option>
        <option value="2002">2002</option>
        <option value="2003">2003</option>
        <option value="2004">2004</option>
        <option value="2005">2005</option>
        <option value="2006">2006</option>
        <option value="2007">2007</option>
        <option value="2008">2008</option>
        <option value="2009">2009</option>
        <option value="2010">2010</option>
        <option value="2011">2011</option>
        <option value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
      </select>

      ${selectToSort}
    `
    aDiv.innerHTML = selectTemplate;
    selectSection.appendChild(aDiv);
    const yearSelector = document.getElementById("year-select");
    const yearSorter = document.getElementById("sort-select");
    showByYear(newData(INJURIES), sectionPainting);

    yearSelector.addEventListener("change", () => {
        let yearSelected = parseInt(yearSelector.value);
        sectionPainting.innerHTML = "";
        if(yearSelected === 0){
            showByYear(newData(INJURIES), sectionPainting);
        } else {
        showByYear(filterByYear(newData(INJURIES), yearSelected), sectionPainting);
        }
    })

    yearSorter.addEventListener("change", () => {
        const typeOfSort = yearSorter.value;
        sectionPainting.innerHTML = "";
        if (typeOfSort === "DSC"){
            showByYear(sortYearDsc(newData(INJURIES)), sectionPainting);
        } else {
            showByYear(sortYearAsc(newData(INJURIES)), sectionPainting);
        } 
    })
});

document.getElementById("go-to-by-indicators").addEventListener("click", () => {
    decisionScreen.style.display = "none";

    const showByIndicator = (arr, sectionPainted) => {
        const newDiv = document.createElement("DIV");
        newDiv.innerHTML += selectToSort;

        for (let i = 0; i < arr.length; i++) {
            let indTemp = `
                <h2>${Object.keys(arr[i])}</h2> 
                <p>${Object.values(arr[i])}</p>
                `    
            newDiv.innerHTML += indTemp;            
        }
        return sectionPainted.appendChild(newDiv);
    };

    showByIndicator(sumOfValuesByInd(newData(INJURIES)), sectionPainting);
    const indSorter = document.getElementById("sort-select");

    indSorter.addEventListener("change", () => {
        const typeOfSort = indSorter.value;
        sectionPainting.innerHTML = "";
        if (typeOfSort === "DSC"){
            showByIndicator(sortByIndValuesDSC(sumOfValuesByInd(newData(INJURIES))), sectionPainting);
        } else {
            showByIndicator(sortByIndValuesASC(sumOfValuesByInd(newData(INJURIES))), sectionPainting);        }
    })
    
})
