const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const { describe } = require("mocha");

// Memuat HTML ke dalam JSDOM
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav>
        <ul>
            <li><a href="#sobre-mim">Sobre mim</a></li>
            <li><a href="#hobbies">My Hobbies</a></li>
            <li><a href="#contact">Contact Me</a></li>
        </ul>
    </nav>
    <h1>Bem vindos tonis mansos!</h1>
    <img src="images/profile.jpg" alt="Profile Picture" width="200">    
    <section id="sobre-mim">
        <h2>Sobre mim</h2>
        <p>Primeira vez a usar HTML and CSS portanto vai ficar lindo!.</p>
        <p>Boas! Sou um corno manso, estou a aprender web development, sinto que já sou um profissional!.</p>
    </section>
    <section id="hobbies">
        <h2>Passatempos</h2>
        <ul>
            <li>Cozinhar gandas cenas</li>
            <li>Correr</li>
            <li>Jogar pc 24/7</li>
        </ul>
    </section>
    <section id="contact">
        <h2>Contact Me</h2>
        <p>You can reach me at <a href="https://discord.gg/9p2k43WF" target="_blank" rel="noopener noreferrer">my Discord</a>.</p>
    </section>
    <footer>
        <p>&copy; 2024 Jorge Conde. All rights reserved.</p>
    </footer>
</body>
</html>
`;

describe('HTML Structure Tests', () => {
    let dom;
    let document;

    before(() => {
        // Membuat DOM simulasi dari HTML
        dom = new JSDOM(htmlContent);
        document = dom.window.document;
    });

    it('should have a title "Document"', () => {
        const title = document.querySelector('title').textContent;
        expect(title).to.equal('Document');
    });

    it('should have a header with text "Bem vindos tonis mansos!"', () => {
        const header = document.querySelector('h1').textContent;
        expect(header).to.equal('Bem vindos tonis mansos!');
    });

    it('should have a navigation bar with three links', () => {
        const navLinks = document.querySelectorAll('nav ul li a');
        expect(navLinks).to.have.lengthOf(3);
        expect(navLinks[0].getAttribute('href')).to.equal('#sobre-mim');
        expect(navLinks[1].getAttribute('href')).to.equal('#hobbies');
        expect(navLinks[2].getAttribute('href')).to.equal('#contact');
    });

    it('should have an image with the alt text "Profile Picture"', () => {
        const img = document.querySelector('img');
        expect(img.getAttribute('alt')).to.equal('Profile Picture');
    });

    it('should have a "Sobre mim" section', () => {
        const sobreMimSection = document.getElementById('sobre-mim');
        expect(sobreMimSection).to.not.be.null;
    });

    it('should have a "Hobbies" section with three items', () => {
        const hobbiesItems = document.querySelectorAll('#hobbies ul li');
        expect(hobbiesItems).to.have.lengthOf(3);
        expect(hobbiesItems[0].textContent).to.equal('Cozinhar gandas cenas');
        expect(hobbiesItems[1].textContent).to.equal('Correr');
        expect(hobbiesItems[2].textContent).to.equal('Jogar pc 24/7');
    });

    it('should have a contact section with a link to Discord', () => {
        const contactLink = document.querySelector('#contact a');
        expect(contactLink.getAttribute('href')).to.equal('https://discord.gg/9p2k43WF');
    });

    it('should have a footer with copyright text', () => {
        const footer = document.querySelector('footer p').textContent;
        expect(footer).to.contain('© 2024 Jorge Conde. All rights reserved.');
    });
});
