let grafico;

function calcularEPlotar() {
    const coefA = parseFloat(document.getElementById("coefA").value);
    const coefB = parseFloat(document.getElementById("coefB").value);

    if (isNaN(coefA) || isNaN(coefB)) {
        alert("Insira valores válidos.");
        return;
    }

    const tipoFuncao = coefA > 0 ? "Crescente" : coefA < 0 ? "Decrescente" : "Constante";
    document.getElementById("resultado").textContent = `Função: y = ${coefA}x + ${coefB}`;
    document.getElementById("tipoFuncao").textContent = `Tipo da função: ${tipoFuncao}`;

    let raizTexto = "Não possui raiz (função constante)";
    let raiz = null;
    if (coefA !== 0) {
        raiz = -coefB / coefA;
        raizTexto = `Raiz: x = ${raiz.toFixed(2)}`;
    }
    document.getElementById("raizFuncao").textContent = raizTexto;

    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x++) {
        xValues.push(x);
        yValues.push(coefA * x + coefB);
    }

    const pontosDestacados = [];
    pontosDestacados.push({ x: 0, y: coefB });
    if (raiz !== null) {
        pontosDestacados.push({ x: raiz, y: 0 });
    }

    const ctx = document.getElementById("grafico").getContext("2d");
    if (grafico) grafico.destroy();

    grafico = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: "Pontos Destacados",
                    data: pontosDestacados,
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    pointRadius: 10,
                },
                {
                    label: "Linha da Função",
                    data: xValues.map((x, i) => ({ x, y: yValues[i] })),
                    borderColor: 'blue',
                    borderWidth: 2,
                    type: 'line',
                    fill: false,
                    showLine: true,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                
