init = () => {

  if ( getSelectedRegion() !== null ) {
    selectRegion.value = userLocation;
  }
  
  const statsStorage = getOrCreateStats();
  const topResults = document.getElementById("topResults");
  const stats = getStats();
  const computedEquivalence = computeEquivalenceFromStatsItem(stats);

  for(let i = 0; i < stats.highestStats.length; i ++) {
      const stat = stats.highestStats[i];
      const tr = document.createElement("tr");
      const percent = document.createElement("td");
      const site = document.createElement("td");
      const data = document.createElement("td");
      const network = document.createElement("td");
      tr.className = "oneResult";
      percent.textContent = stat.percent;
      site.textContent = stat.origin;
      data.textContent = toMegaByteNoRound(statsStorage.bytesDataCenter[stat.origin].total);
      network.textContent = toMegaByteNoRound(statsStorage.bytesNetwork[stat.origin].total + statsStorage.bytesDataCenter[stat.origin].total);
      tr.appendChild(percent);
      tr.appendChild(site);
      tr.appendChild(data);
      tr.appendChild(network);
      topResults.appendChild(tr);
  }

  injectEquivalentIntoHTML(stats, computedEquivalence);
}

selectRegionHandler = (event) => {
    const selectedRegion = event.target.value;
  
    if ('' === selectedRegion) {
      return;
    }
  
    localStorage.setItem('selectedRegion', selectedRegion);
    userLocation = selectedRegion;
}

const selectRegion = document.getElementById('selectRegion');
selectRegion.addEventListener('change', selectRegionHandler);

loadTranslations();

init();