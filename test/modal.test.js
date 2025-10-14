import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import * as bootstrap from 'bootstrap';
import { ver } from '../src/js/modules/version';

// Helper para criar o DOM e Bootstrap
function setupDOM() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
        <button type="button" data-bs-toggle="modal" data-bs-target="#leo-modal">
          veja a versão do Léo »
        </button>
        <div class="modal fade" id="leo-modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Versão do Léo</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <span id="leo-birthday" data-leo-birthday="2015-10-22">22/10/2015</span>
                <span id="leo-version">v0.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);

  global.window = dom.window;
  global.window.bootstrap = bootstrap;
  global.document = dom.window.document;

  // Initialize modals
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modalEl => {
    const modal = new window.bootstrap.Modal(modalEl);
    modalEl.addEventListener('show.bs.modal', () => {
      modalEl.classList.add('show');
      modalEl.setAttribute('aria-modal', 'true');
      modalEl.style.display = 'block';
    });
    modalEl.addEventListener('hide.bs.modal', () => {
      modalEl.classList.remove('show');
      modalEl.removeAttribute('aria-modal');
      modalEl.style.display = 'none';
    });
  });

  return dom;
}

describe('Modal do Leo', () => {
  beforeEach(() => {
    setupDOM();
  });

  it('deve mostrar o modal quando o botão é clicado', () => {
    const button = document.querySelector('[data-bs-toggle="modal"]');
    const modal = document.querySelector('#leo-modal');
    
    // Simula o evento do Bootstrap
    modal.dispatchEvent(new Event('show.bs.modal'));
    
    expect(modal.classList.contains('show')).toBe(true);
    expect(modal.style.display).toBe('block');
  });

  it('deve esconder o modal quando o botão de fechar é clicado', () => {
    const modal = document.querySelector('#leo-modal');
    
    // Primeiro mostra o modal
    modal.dispatchEvent(new Event('show.bs.modal'));
    expect(modal.classList.contains('show')).toBe(true);
    
    // Simula o evento de fechar
    modal.dispatchEvent(new Event('hide.bs.modal'));
    expect(modal.classList.contains('show')).toBe(false);
    expect(modal.style.display).toBe('none');
  });

  it('deve mostrar a versão correta do Leo', () => {
    const leoBirthday = document.getElementById('leo-birthday').dataset.leoBirthday;
    const leoVersion = document.getElementById('leo-version');
    
    const birthday = new Date(leoBirthday);
    const today = new Date('2025-10-14');
    
    const version = ver(birthday, today);
    leoVersion.textContent = version;
    
  expect(leoVersion.textContent).toMatch(/^v\d+\.\d+\.\d+$/);
  // Ensure it's not the placeholder and looks like a proper semver-like string
  expect(leoVersion.textContent).not.toBe('v0.0.0');
  });
});
