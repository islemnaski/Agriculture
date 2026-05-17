import { useState } from "react";
import "./App.css";

export default function App() {

  // ================================
  // Coût annuel
  // ================================
  const [cost, setCost] = useState(9000);

  // ================================
  // Variables aléatoires : Production
  // ================================
  const [productions, setProductions] = useState([
    { value: 800, prob: 0.3 },
    { value: 1200, prob: 0.5 },
    { value: 1600, prob: 0.2 },
  ]);

  // ================================
  // Variables aléatoires : Prix
  // ================================
  const [prices, setPrices] = useState([
    { value: 8, prob: 0.25 },
    { value: 10, prob: 0.5 },
    { value: 14, prob: 0.25 },
  ]);

  // ================================
  // Labels
  // ================================
  const productionLabels = [
    "Mauvaise année",
    "Année moyenne",
    "Bonne année",
  ];

  const priceLabels = [
    "Prix faible",
    "Prix moyen",
    "Prix élevé",
  ];

  // ================================
  // Résultats
  // ================================
  const [result, setResult] = useState(null);

  // ================================
  // Choix aléatoire selon probabilité
  // ================================
  const randomChoice = (list) => {
    const r = Math.random();

    let cumulative = 0;

    for (let item of list) {
      cumulative += parseFloat(item.prob);

      if (r <= cumulative) {
        return parseFloat(item.value);
      }
    }
  };

  // ================================
  // Simulation Monte Carlo
  // ================================
  const runSimulation = () => {

    const simulations = 10000;

    let benefits = [];

    for (let i = 0; i < simulations; i++) {

      // Production aléatoire
      const X = randomChoice(productions);

      // Prix aléatoire
      const Y = randomChoice(prices);

      // Calcul bénéfice
      const profit = X * Y - cost;

      benefits.push(profit);
    }

    // Moyenne
    const avg =
      benefits.reduce((a, b) => a + b, 0) / simulations;

    // Probabilité de gain
    const gain =
      benefits.filter((b) => b > 0).length / simulations;

    // Probabilité de perte
    const loss =
      benefits.filter((b) => b < 0).length / simulations;

    // Sauvegarde résultats
    setResult({
      avg: avg.toFixed(2),
      gain: (gain * 100).toFixed(2),
      loss: (loss * 100).toFixed(2),
    });
  };

  // ================================
  // Modifier inputs
  // ================================
  const handleChange = (type, index, field, value) => {

    const list =
      type === "prod"
        ? [...productions]
        : [...prices];

    list[index][field] = value;

    type === "prod"
      ? setProductions(list)
      : setPrices(list);
  };

  // ================================
  // Interface
  // ================================
  return (

    <div className="container">

      <h1>
        🌿 Simulation Monte Carlo - Huile d'Olive
      </h1>

      {/* ========================= */}
      {/* Production */}
      {/* ========================= */}

      <div className="section">

        <h2>
          1. Production annuelle d’huile d’olive
        </h2>

        <p>
          La production dépend des conditions climatiques.
        </p>

        {productions.map((p, i) => (

          <div key={i} className="input-group">

            <label className="inline-label">
              {productionLabels[i]} :
            </label>

            <input
              type="number"
              value={p.value}
              onChange={(e) =>
                handleChange(
                  "prod",
                  i,
                  "value",
                  e.target.value
                )
              }
              placeholder="Production"
            />

            <input
              type="number"
              step="0.01"
              value={p.prob}
              onChange={(e) =>
                handleChange(
                  "prod",
                  i,
                  "prob",
                  e.target.value
                )
              }
              placeholder="Probabilité"
            />

          </div>
        ))}
      </div>

      {/* ========================= */}
      {/* Prix */}
      {/* ========================= */}

      <div className="section">

        <h2>
          2. Prix de vente de l’huile d’olive
        </h2>

        <p>
          Le prix dépend du marché.
        </p>

        {prices.map((p, i) => (

          <div key={i} className="input-group">

            <label className="inline-label">
              {priceLabels[i]} :
            </label>

            <input
              type="number"
              value={p.value}
              onChange={(e) =>
                handleChange(
                  "price",
                  i,
                  "value",
                  e.target.value
                )
              }
              placeholder="Prix"
            />

            <input
              type="number"
              step="0.01"
              value={p.prob}
              onChange={(e) =>
                handleChange(
                  "price",
                  i,
                  "prob",
                  e.target.value
                )
              }
              placeholder="Probabilité"
            />

          </div>
        ))}
      </div>

      {/* ========================= */}
      {/* Coût */}
      {/* ========================= */}

      <div className="section">

        <h2>
          3. Coût annuel d’exploitation
        </h2>

        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Coût annuel"
        />

      </div>

      {/* ========================= */}
      {/* Bouton */}
      {/* ========================= */}

      <button onClick={runSimulation}>
        Lancer la simulation
      </button>

      {/* ========================= */}
      {/* Résultats */}
      {/* ========================= */}

      {result && (

        <div className="results">

          <h2>
            📊 Résultats de la simulation
          </h2>

          <p>
            Bénéfice moyen :
            <strong> {result.avg} DT</strong>
          </p>

          <p>
            Probabilité de gain :
            <strong> {result.gain}%</strong>
          </p>

          <p>
            Probabilité de perte :
            <strong> {result.loss}%</strong>
          </p>

        </div>
      )}

    </div>
  );
}