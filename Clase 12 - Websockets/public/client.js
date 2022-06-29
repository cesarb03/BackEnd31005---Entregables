const socket = io();
const productForm = document.querySelector("#productForm");
const titleInput = document.querySelector(".titleInput");
const priceInput = document.querySelector(".priceInput");
const thumbnailInput = document.querySelector(".thumbnailInput");

const formMessage = document.querySelector("#formMessage");
const userEmailInput = document.querySelector("#userEmailInput");
const messageInput = document.querySelector("#messageInput");
const messagesPool = document.querySelector("#messagesPool");

function sendProduct() {
  try {
    const title = titleInput.value;
    const price = Number(priceInput.value);
    const thumbnail = thumbnailInput.value;
    socket.emit("client:product", { title, price, thumbnail });
  } catch (err) {
    console.log(`Hubo un error ${err}`);
  }
}

async function renderProducts(products) {
  const response = await fetch("/products.hbs");
  const plantilla = await response.text();
  document.querySelector("#products").innerHTML = "";
  products.forEach((product) => {
    const template = Handlebars.compile(plantilla);
    const html = template(product);
    document.querySelector("#products").innerHTML += html;
  });
}

const sendMessage = () => {
  try {
    const userEmail = userEmailInput.value;
    const message = messageInput.value;
    const date = new Date().toLocaleString("es-AR")
    socket.emit("client:message", { userEmail, message, date });
  } catch (error) {
    console.log(`Han error has ocurred; ${error}`);
  }
};

const renderMessages = (messages) => {
  try {
    const html = messages
      .map((messageInfo) => {
        return `
                <div class="col-8">
                    <p><span class="userEmail fw-bold">${messageInfo.userEmail} :</span>
                      <span  class= "text-danger">${messageInfo.date}: </span>
                        <span class="userMessage">${messageInfo.message}</span>
                    </p>
                </div>
                `;
      })
      .join(" ");

    messagesPool.innerHTML = html;
  } catch (error) {
    console.log(`Hubo un error ${error}`);
  }
};

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendProduct();
  titleInput.value = "";
  priceInput.value = "";
  thumbnailInput.value = "";
});

formMessage.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
  messageInput.value = "";
});

socket.on("server:product", renderProducts);
socket.on("server:message", renderMessages);
