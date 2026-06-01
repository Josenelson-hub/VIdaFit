let step = 0;

const state = {
  name: "",
  age: null,
  weight: null,
  height: null,
  objective: "",
  budget: null,
};

// =====================
// INIT
// =====================
function init() {
  bindEvents();
  render();
}

// =====================
// NAVIGATION
// =====================
function nextStep() {
  if (!validateStep(step)) return;
  step++;
  render();
}

function prevStep() {
  if (step > 0) step--;
  render();
}

// =====================
// VALIDATION SIMPLE
// =====================
function validateStep(step) {
  if (step === 0) {
    state.name = document.getElementById("name").value;
    state.age = Number(document.getElementById("age").value);
    state.weight = Number(document.getElementById("weight").value);
    state.height = Number(document.getElementById("height").value);

    return state.name && state.age && state.weight && state.height;
  }

if (step === 1) {
  return setObjectiveFromForm();
}

  if (step === 2) {
    state.budget = Number(document.getElementById("budget").value);
    return !!state.budget;
  }

  return true;
}

// =====================
// OBJECTIVE SELECT
// =====================
function setObjectiveFromForm() {
  const selected = document.querySelector('input[name="objective"]:checked');

  if (!selected) {
    state.objective = "";
    return false;
  }

  state.objective = selected.value;
  return true;
}

// =====================
// RENDER SYSTEM
// =====================
function render() {
  // steps UI (progress bar)
  document.querySelectorAll(".step").forEach((el, index) => {
    el.classList.toggle("active", index === step);
  });

  // screens
  document.querySelectorAll("[data-step]").forEach(el => {
    el.style.display = Number(el.dataset.step) === step ? "block" : "none";
  });

  // buttons logic
  const nextBtn = document.querySelector(".next-btn");
  const backBtn = document.querySelector(".back-btn");

  if (backBtn) backBtn.style.display = step === 0 ? "none" : "inline-block";

  if (nextBtn) {
    nextBtn.innerText = step === 2 ? "Gerar plano" : "Próximo";
  }
}

// =====================
// CALCULATION
// =====================
function generate() {
  if (!validateStep(2)) return;

  const tdee =
    10 * state.weight +
    6.25 * state.height -
    5 * state.age + 5;

  let calories = tdee;

  if (state.objective === "bulking") calories += 300;
  if (state.objective === "cutting") calories -= 400;

  const macros = {
    protein: (calories * 0.3) / 4,
    carbs: (calories * 0.45) / 4,
    fat: (calories * 0.25) / 9,
  };

  step = 3;
  render();

  document.getElementById("result").innerHTML = `
  <div class="result-card">

    <div class="result-hero">
      <h3>${state.name}</h3>
      <p>Seu plano de nutrição personalizado está pronto</p>
    </div>

    <div class="result-grid">
      <div class="card-item">
        <span>🔥 Calorias</span>
        <strong>${Math.round(calories)} kcal</strong>
      </div>

      <div class="card-item">
        <span>💪 Proteína</span>
        <strong>${Math.round(macros.protein)}g</strong>
      </div>

      <div class="card-item">
        <span>🍚 Carboidratos</span>
        <strong>${Math.round(macros.carbs)}g</strong>
      </div>

      <div class="card-item">
        <span>🥑 Gorduras</span>
        <strong>${Math.round(macros.fat)}g</strong>
      </div>
    </div>

    <div class="result-footer">
      <p><strong>Orçamento informado:</strong> R$ ${state.budget}</p>
      <p class="hint">Plano ajustado para objetivo: <b>${state.objective}</b></p>
    </div>

    <!-- ===================== -->
    <!-- PLANOS -->
    <!-- ===================== -->
    <div class="plans">

      <div class="plan">
        <h4>Plano Essencial</h4>
        <div class="price">R$ 12<span>/mês</span></div>
        <ul>
          <li>✔ Dieta básica personalizada</li>
          <li>✔ Macros calculados</li>
          <li>✔ Acesso ao plano inicial</li>
        </ul>
        <button>Escolher Essencial</button>
      </div>

      <div class="plan highlight">
        <div class="badge">MAIS ESCOLHIDO</div>
        <h4>Plano Performance</h4>
        <div class="price">R$ 20<span>/mês</span></div>
        <ul>
          <li>✔ Tudo do Essencial</li>
          <li>✔ Ajuste de objetivo inteligente</li>
          <li>✔ Sugestões de refeições</li>
          <li>✔ Evolução semanal</li>
        </ul>
        <button>Escolher Performance</button>
      </div>

      <div class="plan">
        <h4>Plano Elite</h4>
        <div class="price">R$ 25<span>/mês</span></div>
        <ul>
          <li>✔ Tudo do Performance</li>
          <li>✔ Plano totalmente otimizado</li>
          <li>✔ Estratégia avançada de recomposição</li>
          <li>✔ Ingredientes necessarios para dieta</li>
        </ul>
        <button>Escolher Elite</button>
      </div>

    </div>

    <button class="cta-btn">
      Continuar para assinatura →
    </button>

  </div>
`;
}

// =====================
// EVENTS
// =====================
function bindEvents() {
  document.querySelector(".next-btn").addEventListener("click", () => {
    if (step === 2) return generate();
    nextStep();
  });

  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", prevStep);
  }
}

init();