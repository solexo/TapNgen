// Generate the HTML template
function generateHTML(data) {
    // Generate services HTML
    let servicesHTML = '';
    data.services.forEach(service => {
        servicesHTML += `
        <div class="feature">
            <i class="${service.icon}"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>`;
    });
    
    // Logo source
    const logoSrc = data.logoData || './logo.png';
    
    // Logo scale (default to 70% if not provided)
    const logoScale = data.logoScale || '70';
    
    // Escape any special characters in text fields
    const escapedLawFirmName = data.lawFirmName.replace(/'/g, "\\'");
    const escapedTagline = data.tagline.replace(/'/g, "\\'");
    const escapedContactName = data.contactName.replace(/'/g, "\\'");
    const escapedContactAddress = data.contactAddress.replace(/'/g, "\\'");
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapedLawFirmName} - Services Juridiques</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <style>
        :root {
            --primary: ${data.primaryColor};
            --secondary: ${data.secondaryColor};
            --accent: ${data.accentColor};
            --dark: ${data.backgroundColor};
            --light: ${data.textColor};
            --glass: rgba(255, 255, 255, 0.1);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            transition: all 0.3s ease;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--dark);
            color: var(--light);
            overflow-x: hidden;
            background: linear-gradient(to bottom right, #0f0c29, #302b63, #24243e);
            background-attachment: fixed;
        }

        .particle {
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            background: radial-gradient(circle at center, var(--primary), transparent);
            animation: float 8s infinite ease-in-out;
            z-index: -1;
            opacity: 0.5;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
            50% { transform: translateY(0) translateX(20px) rotate(180deg); }
            75% { transform: translateY(20px) translateX(10px) rotate(270deg); }
        }

        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(10, 10, 25, 0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 15px 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .navbar .logo {
            font-size: 1.5rem;
            font-weight: bold;
            letter-spacing: 2px;
            color: var(--primary);
            text-transform: uppercase;
        }

        .navbar .nav-links {
            display: flex;
            gap: 30px;
        }

        .navbar .nav-links a {
            color: var(--light);
            text-decoration: none;
            position: relative;
            padding: 5px 0;
        }

        .navbar .nav-links a::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: var(--primary);
            transition: width 0.3s;
        }

        .navbar .nav-links a:hover::after {
            width: 100%;
        }

        #hero {
            display: flex;
            min-height: 100vh;
            padding: 150px 5% 100px;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom right, rgba(15, 12, 41, 0.9), rgba(48, 43, 99, 0.9), rgba(36, 36, 62, 0.9));
            z-index: -1;
        }

        .hero-content {
            max-width: 600px;
            margin-right: auto;
            z-index: 2;
            animation: fadeInLeft 1s ease-out;
        }

        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .hero-content h2 {
            font-size: 3em;
            font-weight: 700;
            margin-bottom: 20px;
            background: linear-gradient(to right, var(--primary), var(--accent));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
        }

        .hero-content p {
            font-size: 1.2em;
            line-height: 1.6;
            margin-bottom: 30px;
            color: rgba(255, 255, 255, 0.9);
        }

        .hero-image-container {
            position: relative;
            width: 300px;
            height: 300px;
            margin-left: 50px;
            z-index: 2;
            animation: float-subtle 6s ease-in-out infinite, fadeIn 1.5s;
        }

        @keyframes float-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .circle-container {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            box-shadow: 0 0 15px rgba(0, 188, 212, 0.5);
            transform: translateZ(0);
            padding: 0;
        }

        .circle-image {
            width: ${logoScale}%;
            height: auto;
            object-fit: contain;
            transform: scale(1);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: none;
            max-height: none;
        }

        .circle-overlay {
            position: absolute;
            width: 110%;
            height: 110%;
            border-radius: 50%;
            background: linear-gradient(45deg, transparent, rgba(0, 188, 212, 0.2), transparent);
            animation: rotate 8s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .circle-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: transparent;
            border: 1px solid var(--primary);
            animation: pulse 2s ease-out infinite;
        }

        @keyframes pulse {
            0% { transform: scale(0.95); opacity: 1; }
            70% { transform: scale(1.1); opacity: 0; }
            100% { transform: scale(0.95); opacity: 0; }
        }

        .futuristic-button {
            background-color: transparent;
            color: #fff;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 50px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            border: 1px solid var(--primary);
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            position: relative;
            overflow: hidden;
            z-index: 1;
            cursor: pointer;
            box-shadow: 0 0 15px rgba(0, 188, 212, 0.3);
        }

        .futuristic-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            transition: width 0.3s ease;
            z-index: -1;
        }

        .futuristic-button:hover::before {
            width: 100%;
        }

        .futuristic-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 25px rgba(0, 188, 212, 0.6);
        }

        .futuristic-button i {
            transition: transform 0.3s ease;
        }

        .futuristic-button:hover i {
            transform: translateX(5px);
        }

        #features {
            padding: 100px 5%;
            text-align: center;
            position: relative;
        }

        .section-title {
            font-size: 2.5em;
            margin-bottom: 50px;
            color: var(--light);
            position: relative;
            display: inline-block;
        }

        .section-title::after {
            content: '';
            position: absolute;
            width: 80px;
            height: 3px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
        }

        .features-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 40px;
        }

        .feature {
            position: relative;
            width: 300px;
            padding: 30px;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .feature::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(0, 188, 212, 0.1), transparent);
            transform: translateY(100%);
            transition: transform 0.6s;
        }

        .feature:hover::before {
            transform: translateY(-100%);
        }

        .feature:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0, 188, 212, 0.2);
        }

        .feature i {
            font-size: 3em;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
        }

        .feature h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
            color: var(--light);
        }

        .feature p {
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
        }

        #contact {
            padding: 100px 5%;
            text-align: center;
            position: relative;
            background: linear-gradient(rgba(10, 10, 25, 0.8), rgba(10, 10, 25, 0.9));
            background-attachment: fixed;
        }

        .contact-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contact-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
            margin-top: 30px;
        }

        .contact-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            width: 200px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .contact-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .contact-item i {
            font-size: 2em;
            color: var(--primary);
            margin-bottom: 15px;
            transition: transform 0.3s;
        }

        .contact-item:hover i {
            transform: scale(1.2);
        }

        .contact-item a {
            color: var(--light);
            text-decoration: none;
            font-size: 1.1em;
            transition: color 0.3s;
            word-break: break-word;
        }

        .contact-item a:hover {
            color: var(--primary);
        }

        footer {
            background-color: rgba(10, 10, 25, 0.9);
            color: var(--light);
            text-align: center;
            padding: 30px 0;
            position: relative;
            overflow: hidden;
        }

        footer p {
            position: relative;
            z-index: 1;
        }

        footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(to right, transparent, var(--primary), transparent);
        }

        @media (max-width: 768px) {
            .navbar {
                padding: 10px 15px;
            }

            .navbar .logo {
                font-size: 1rem;
                letter-spacing: 1px;
                max-width: 70%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .navbar .nav-links {
                display: none;
            }

            #hero {
                flex-direction: column;
                text-align: center;
                padding: 170px 20px 50px;
            }

            .hero-content {
                max-width: 100%;
                margin-right: 0;
                margin-bottom: 50px;
            }

            .hero-content h2 {
                font-size: 2.3em;
            }

            .hero-image-container {
                width: 280px;
                height: 280px;
                margin-left: 0;
            }
            
            .circle-image {
                width: ${logoScale}%;
                height: auto;
                object-fit: contain;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: none;
                max-height: none;
                background-color: transparent;
            }
            
            .circle-container {
                background-color: white;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                position: relative;
            }

            .features-container {
                flex-direction: column;
                align-items: center;
            }

            .feature {
                width: 100%;
                max-width: 320px;
            }

            .contact-info {
                flex-direction: column;
                align-items: center;
            }

            .contact-item {
                width: 100%;
                max-width: 280px;
            }

            .contact-item a {
                font-size: 0.9em;
            }
        }
    </style>
</head>
<body>
    <!-- Animated particles in background -->
    <div id="particles"></div>

    <!-- Navigation bar -->
    <nav class="navbar">
        <div class="logo">${escapedLawFirmName}</div>
        <div class="nav-links">
            <a href="#hero">Accueil</a>
            <a href="#features">Services</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>

    <section id="hero">
        <div class="hero-background"></div>
        <div class="hero-content">
            <h2>${escapedLawFirmName}</h2>
            <p>${escapedTagline}</p>
            <a href="#" id="downloadVCard" class="futuristic-button">
                <i class="fas fa-address-card"></i> Ajouter aux Contacts
            </a>
        </div>
        <div class="hero-image-container">
            <div class="circle-container">
                <img src="${logoSrc}" alt="${escapedLawFirmName}" class="circle-image" loading="eager" onerror="this.onerror=null;this.alt='${escapedLawFirmName.toUpperCase()}';">
                <div class="circle-overlay"></div>
                <div class="circle-pulse"></div>
            </div>
        </div>
    </section>

    <section id="features">
        <h2 class="section-title">${data.servicesTitle}</h2>
        <div class="features-container">
            ${servicesHTML}
        </div>
    </section>

    <section id="contact">
        <h2 class="section-title">${data.contactTitle}</h2>
        <div class="contact-container">
            <p>${data.contactSubtitle}</p>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <a href="https://www.google.com/maps" target="_blank">
                        ${escapedContactAddress}
                    </a>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone-alt"></i>
                    <a href="tel:${data.contactPhone}">${data.contactPhone}</a>
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:${data.contactEmail}">${data.contactEmail}</a>
                </div>
                <div class="contact-item">
                    <i class="fas fa-globe"></i>
                    <a href="https://${data.contactWebsite}" target="_blank">${data.contactWebsite}</a>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p>${data.footerText}</p>
    </footer>

    <script>
        // Create animated background particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const numberOfParticles = 20;
            
            for (let i = 0; i < numberOfParticles; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                // Random size
                const size = Math.random() * 150 + 50;
                
                // Random animation delay
                const delay = Math.random() * 8;
                
                particle.style.left = \`\${posX}vw\`;
                particle.style.top = \`\${posY}vh\`;
                particle.style.width = \`\${size}px\`;
                particle.style.height = \`\${size}px\`;
                particle.style.animationDelay = \`\${delay}s\`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Animate on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.feature, .contact-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            elements.forEach(element => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
        }

        // vCard download functionality
        document.getElementById('downloadVCard').addEventListener('click', function(e) {
            e.preventDefault();

            // Contact data - safe encoding
            var phoneNumber = "${data.contactPhone}";
            var contactName = "${escapedContactName} - ${escapedLawFirmName}";
            var email = "${data.contactEmail}";
            var address = "${escapedContactAddress}";
            var website = "${data.contactWebsite}";
            var fullName = "${escapedContactName}";
            var nameParts = fullName.split(' ');
            var lastName = nameParts.length > 1 ? nameParts.pop() : fullName;
            var firstName = nameParts.join(' ');
            var organization = "${escapedLawFirmName}";
            
            // Create vCard data without template literals
            var vCardData = "BEGIN:VCARD\\nVERSION:3.0\\nN:" + lastName + ";" + firstName + ";;;\\nFN:" + contactName + "\\nORG:" + organization + "\\nTITLE:Avocat\\nTEL;TYPE=WORK,VOICE:" + phoneNumber + "\\nADR;TYPE=WORK:;;" + address + ";;;\\nEMAIL;TYPE=WORK:" + email + "\\nURL:" + website + "\\nEND:VCARD";
                
            var blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
            var url = URL.createObjectURL(blob);

            var link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', firstName + '-' + lastName + '-Contact.vcf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        });

        // Initialize everything when the page loads
        window.addEventListener('load', () => {
            createParticles();
            animateOnScroll();
            
            // Smooth scroll for navigation links
            document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    if(this.getAttribute('href') === "#") return;
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(this.getAttribute('href'));
                    if(targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
    </script>
</body>
</html>`;
} 