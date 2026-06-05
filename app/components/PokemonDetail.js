"use client";

import { useEffect, useState } from "react";
import { getPokemonId, getPokemonImage } from "../lib/pokeapi";
import styles from "./PokemonDetail.module.css";

// Expanded "detail card" shown on top of the page when a Pokémon is clicked.
// It fetches the full details (types, stats, height, weight) for that Pokémon.
export default function PokemonDetail({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      setDetails(data);
    }
    loadDetails();
  }, [pokemon]);

  const id = getPokemonId(pokemon.url);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "32px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
        }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <img
          src={getPokemonImage(id)}
          alt={pokemon.name}
          style={{ width: "180px", height: "180px", objectFit: "contain" }}
        />

        <h2
          style={{
            textTransform: "capitalize",
            fontSize: "26px",
            margin: "8px 0 4px",
          }}
        >
          {pokemon.name}
        </h2>
        <p style={{ color: "#9aa0a6", fontWeight: 600 }}>#{id}</p>

        {!details ? (
          <p style={{ marginTop: "20px" }}>Loading details…</p>
        ) : (
          <div style={{ marginTop: "16px", textAlign: "left" }}>
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              {details.types.map((t) => (
                <span
                  key={t.type.name}
                  style={{
                    backgroundColor: "#ef5350",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    textTransform: "capitalize",
                  }}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <p style={{ margin: "4px 0" }}>
              <strong>Height:</strong> {details.height / 10} m
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>Weight:</strong> {details.weight / 10} kg
            </p>

            <h3 style={{ marginTop: "16px", marginBottom: "8px" }}>Base stats</h3>
            {details.stats.map((s) => (
              <div
                key={s.stat.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  padding: "2px 0",
                }}
              >
                <span style={{ textTransform: "capitalize" }}>{s.stat.name}</span>
                <span style={{ fontWeight: 700 }}>{s.base_stat}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
