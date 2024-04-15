
function openOverlay(entry, index) {
    const overlay = document.getElementById('overlay');
    const existingOverlayContent = document.getElementById('overlayContent');

    // Clear previous content
    if (existingOverlayContent) {
        existingOverlayContent.remove();
    }

    // Create overlayContent dynamically
    const overlayContent = document.createElement('div');
    overlayContent.id = 'overlayContent';

    // Create elements for the content
    const heading = document.createElement('h2');
    const orderNumber = decimalToBase20(index + 1) + " ";
    heading.innerHTML = orderNumber + "<br>" + entry["mə́'βal"].replace("*'h","'h") +
        ", " + entry["mə́'βal pepih p'θas 'hŋin"];

    const paragraph = document.createElement('p');
    paragraph.textContent = entry["kə́'yiɪkliʂ"];

    // Close button
    const closeButton = document.createElement('button');
    closeButton.textContent = "'taŋ";
    closeButton.addEventListener('click', function () {
        closeOverlay();
        centerOverlay();
    });

    // Append elements to overlayContent
    overlayContent.appendChild(heading);
    overlayContent.appendChild(paragraph);
    overlayContent.appendChild(closeButton);

    // Append overlayContent to overlay
    overlay.appendChild(overlayContent);

    // Display the overlay
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when the overlay is open
    window.addEventListener('resize', centerOverlay); // Adjust position on window resize
}

// ... (other functions remain unchanged)


function closeOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling when the overlay is closed
    window.removeEventListener('resize', centerOverlay); // Remove the resize event listener
}

function centerOverlay() {
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlayContent');

    // Calculate the top position to center the overlay vertically
    const topPosition = (window.innerHeight - overlayContent.offsetHeight) / 2;
    overlayContent.style.top = `${Math.max(topPosition, 20)}px`;
}

function decimalToBase20(decimalNumber) {
    const base20Symbols = ['0', 'A', 'B', 'ð', 'D',
        'O̊', 'Å', 'B̊', 'C̊', 'D̊',
        'Ō', 'Ā', 'B̄', 'C̄', 'D̄',
        'Ē', 'F̄', 'Ḡ', 'H̄', 'J̄'];

    if (decimalNumber < 0) {
        throw new Error('Input must be a non-negative integer.');
    }

    if (decimalNumber === 0) {
        return base20Symbols[0];
    }

    let result = '';

    while (decimalNumber > 0) {
        const remainder = decimalNumber % 20;
        result = base20Symbols[remainder] + result;
        decimalNumber = Math.floor(decimalNumber / 20);
    }

    return result;
}
