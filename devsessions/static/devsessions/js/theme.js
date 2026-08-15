document.addEventListener('DOMContentLoaded', () => {
            const themeToggler = document.getElementById('themeToggler');
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.getElementById('themeText');
            const htmlElement = document.documentElement;

            // Configuración del ciclo de 6 temas
            const themes = {
                'light': {
                    next: 'dark',
                    icon: 'bi-sun-fill',
                    label: 'Modo Claro'
                },
                'dark': {
                    next: 'green',
                    icon: 'bi-moon-stars-fill',
                    label: 'Modo Oscuro'
                },
                'green': {
                    next: 'pepsi',
                    icon: 'bi-tree-fill',
                    label: 'Modo Verde'
                },
                'pepsi': {
                    next: 'leica',
                    icon: 'bi-cup-straw',
                    label: 'Modo Pepsi'
                },
                'leica': {
                    next: 'earth',
                    icon: 'bi-camera-fill',
                    label: 'Modo Leica'
                },
                'earth': {
                    next: 'light',
                    icon: 'bi-globe-americas',
                    label: 'Modo Tierra'
                }
            };

            // 1. Cargar tema guardado o por defecto 'light'
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);

            // 2. Transición al siguiente tema en el ciclo
            themeToggler.addEventListener('click', () => {
                const currentTheme = htmlElement.getAttribute('data-bs-theme') || 'light';
                const nextTheme = themes[currentTheme] ? themes[currentTheme].next : 'light';
                setTheme(nextTheme);
            });

            function setTheme(theme) {
                if (!themes[theme]) theme = 'light';

                htmlElement.setAttribute('data-bs-theme', theme);
                localStorage.setItem('theme', theme);

                themeIcon.className = `bi ${themes[theme].icon}`;
                themeText.textContent = themes[theme].label;
            }
        });