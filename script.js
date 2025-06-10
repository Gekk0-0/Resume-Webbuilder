"use strict";

// Клас для розділів особистої інформації
class PersonalInfo {
  constructor(name, age, phoneNumber, email, otherContacts) {
    this.name = name;
    this.age = Number(age);
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.otherContacts = otherContacts;
  }

  get info() {
    return `ПІБ: ${this.name}<br> Вік: ${this.age}<br> Номер телефону: ${this.phoneNumber}<br> Електронна адреса: ${this.email}<br> Інші контактні дані: ${this.otherContacts}.`;
  }
}

// Клас для розділу освіти
class Education {
  constructor(description) {
    this.description = description;
  }

  get formattedEducation() {
    return this.description.replace(/\n/g, "<br>");
  }
}

// Клас для розділу досвіду
class Experience {
  constructor(description) {
    this.description = description;
  }

  get formattedExperience() {
    return this.description.replace(/\n/g, "<br>");
  }
}

// Клас для навичок
class Skills {
  constructor(skillList) {
    this.skills = skillList;
  }

  get formattedSkills() {
    return this.skills.map((s, i) => `${i + 1}. ${s}`).join("<br>");
  }
}

// Основний клас Резюме, що об'єднує всі розділи та виводить їх разом
class Resume {
  constructor(personalInfo, education, experience, skills) {
    this.personalInfo = personalInfo;
    this.education = education;
    this.experience = experience;
    this.skills = skills;
  }

  display() {
    return `
      <div class="resume-section"><strong>Особиста інформація:</strong><br>${this.personalInfo.info}</div>
      <div class="resume-section"><strong>Освіта:</strong><br>${this.education.formattedEducation}</div>
      <div class="resume-section"><strong>Досвід роботи:</strong><br>${this.experience.formattedExperience}</div>
      <div class="resume-section"><strong>Навички:</strong><br>${this.skills.formattedSkills}</div>
    `;
  }
}

// Функція-замикання для перевірки порожніх полів
function validator(fieldName) {
  return function(value) {
    if (!value || value.trim() === "") {
      alert(`Поле "${fieldName}" не може бути порожнім`);
      throw new Error(`Помилка в полі ${fieldName}`);
    }
    return value.trim();
  };
}

// Перевірка віку

function validateAge(ageValue) {
  const age = Number(ageValue);
  if (isNaN(age) || age < 5 || age > 120) {
    alert("Вік має бути числом від 5 до 120");
    throw new Error("Невалідний вік");
  }
  return age;
}

// Перевірка номера телефону
function validatePhone(phone) {
  const phonePattern = /^\+?\d{10,15}$/;
  if (!phonePattern.test(phone)) {
    alert("Введіть коректний номер телефону у форматі +380XXXXXXXXX");
    throw new Error("Невалідний номер телефону");
  }
  return phone;
}

// Перевірка електронної адреси

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Введіть коректну електронну адресу");
    throw new Error("Невалідний email");
  }
  return email;
}

// Каррінг для обробки рядка навичок
const processSkills = str => str.split(",").map(s => s.trim()).filter(Boolean);

// Збір даних та створення резюме
function manageResume() {
    try {
    const name = validator("Ваші ПІБ:")(document.getElementById("name").value);
    const age = validateAge(validator("Ваш поточний вік")(document.getElementById("age").value));
    const phoneNumber = validatePhone(validator("Ваш номер телефону")(document.getElementById("phoneNumber").value));
    const email = validateEmail(validator("Ваша електронна адреса")(document.getElementById("email").value));
    const otherContacts = validator("Ваші інші контактні дані (телефон, телеґрам, інстаґрам та ін.):")(document.getElementById("otherContacts").value);
    const education = validator("Освіта (школа, коледж та/або ВНЗ, навіть якщо освітній ступінь ще не отримано):")(document.getElementById("education").value);
    const experience = validator("Досвід роботи (місце роботи + стаж, за необхідності, з поясненням):")(document.getElementById("experience").value);
    const skills = processSkills(validator("Технічні/соціальні навички (пишіть, будь ласка, через кому):")(document.getElementById("skills").value));

    const personal = new PersonalInfo(name, age, phoneNumber, email, otherContacts);
    const edu = new Education(education);
    const exp = new Experience(experience);
    const skl = new Skills(skills);

    const resume = new Resume(personal, edu, exp, skl);

    document.getElementById("resumeDisplay").innerHTML = resume.display();

    localStorage.setItem("resumeData", JSON.stringify({ name, age, phoneNumber, email, otherContacts, education, experience, skills }));

    // Зміна кнопки на "Оновити резюме"
    document.getElementById("createOrUpdate").textContent = "Оновити резюме";
  } catch (e) {
    console.error("Помилка при створенні/оновленні резюме:", e.message);
  }
}

// Очищення збережених даних і результатів
function clearStorage() {
  localStorage.removeItem("resumeData");
  alert("Збережені дані очищено");
  document.getElementById("resumeDisplay").innerHTML = "";
  document.getElementById("createOrUpdate").textContent = "Створити резюме";

  // Очищаємо поля форми
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("email").value = "";
  document.getElementById("otherContacts").value = "";
  document.getElementById("education").value = "";
  document.getElementById("experience").value = "";
  document.getElementById("skills").value = "";
}
