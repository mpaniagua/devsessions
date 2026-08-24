// static/js/MainAppDark.jsx

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// =================================================================
// PALETA DE COLORES TEMA OSCURO (Slate / Dark Navy)
// =================================================================
const darkTheme = {
  bgApp: '#0f172a',
  bgCard: '#1e293b',
  bgModal: '#1e293b',
  bgInput: '#334155',
  border: '#334155',
  borderFocus: '#60a5fa',
  textMain: '#f8fafc',
  textMuted: '#94a3b8',
  textBright: '#ffffff',
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  accentTag: '#1e3a8a',
  accentTagText: '#93c5fd',
  greenTag: '#064e3b',
  greenTagText: '#6ee7b7',
  dangerBg: '#450a0a',
  dangerBorder: '#991b1b',
  dangerText: '#fca5a5',
};

const styles = {
  container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  navBar: {
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    padding: '1rem 2rem',
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
  },
  brandTitle: { fontSize: '1.25rem', fontWeight: 'bold', color: '#f8fafc', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' },
  navTabs: { display: 'flex', gap: '0.5rem' },
  navButton: (active) => ({
    backgroundColor: active ? '#3b82f6' : 'transparent',
    color: active ? '#ffffff' : '#94a3b8',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  }),
  headerBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { color: darkTheme.textMain, margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' },
  card: { border: `1px solid ${darkTheme.border}`, borderRadius: '8px', padding: '1.5rem', backgroundColor: darkTheme.bgCard, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.4)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  badge: { backgroundColor: '#334155', color: '#cbd5e1', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' },
  badgeActive: { backgroundColor: '#064e3b', color: '#6ee7b7', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' },
  badgeInactive: { backgroundColor: '#450a0a', color: '#fca5a5', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' },
  detailBox: { backgroundColor: '#0f172a', padding: '0.8rem', borderRadius: '6px', borderLeft: '4px solid #3b82f6', margin: '0.5rem 0' },
  section: { marginTop: '1rem' },
  tagContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.3rem' },
  tagPrimary: { backgroundColor: darkTheme.accentTag, color: darkTheme.accentTagText, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' },
  tagSecondary: { backgroundColor: darkTheme.greenTag, color: darkTheme.greenTagText, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' },
  tagDark: { backgroundColor: '#334155', color: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.80rem' },
  center: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: darkTheme.textMuted },
  error: { color: '#f87171', textAlign: 'center', padding: '3rem' },
  
  // Botones
  btnPrimary: { backgroundColor: darkTheme.primary, color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnSecondary: { backgroundColor: '#334155', color: '#cbd5e1', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', marginRight: '0.5rem' },
  cardActions: { display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' },
  btnEdit: { backgroundColor: '#334155', color: '#f8fafc', border: `1px solid ${darkTheme.border}`, padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },
  btnDelete: { backgroundColor: darkTheme.dangerBg, color: darkTheme.dangerText, border: `1px solid ${darkTheme.dangerBorder}`, padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },

  // Modal
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: darkTheme.bgModal, padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', border: `1px solid ${darkTheme.border}` },
  formGroup: { marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  checkboxGroup: { marginBottom: '1.2rem' },
  input: { padding: '0.6rem', borderRadius: '6px', border: `1px solid ${darkTheme.border}`, backgroundColor: darkTheme.bgInput, color: darkTheme.textMain, fontSize: '0.9rem', width: '100%', boxSizing: 'border-box' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }
};

// =================================================================
// COMPONENTE CONTENEDOR PRINCIPAL
// =================================================================
const MainApp = () => {
  const [activeTab, setActiveTab] = React.useState('kits');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkTheme.bgApp }}>
      {/* MENÚ DE NAVEGACIÓN */}
      <nav style={styles.navBar}>
        <div style={styles.brandTitle}>
          📷 <span>Gabinete Fotográfico</span>
        </div>
        <div style={styles.navTabs}>
          <button style={styles.navButton(activeTab === 'kits')} onClick={() => setActiveTab('kits')}>⚙️ Kits</button>
          <button style={styles.navButton(activeTab === 'cameras')} onClick={() => setActiveTab('cameras')}>📷 Cámaras</button>
          <button style={styles.navButton(activeTab === 'lenses')} onClick={() => setActiveTab('lenses')}>🔍 Lentes</button>
          <button style={styles.navButton(activeTab === 'accessories')} onClick={() => setActiveTab('accessories')}>📦 Accesorios</button>
          <button style={styles.navButton(activeTab === 'mounts')} onClick={() => setActiveTab('mounts')}>🔧 Monturas</button>
        </div>
      </nav>

      {/* CONTENIDO SEGÚN LA PESTAÑA ACTIVA */}
      <main style={styles.container}>
        {activeTab === 'kits' && <KitView />}
        {activeTab === 'cameras' && <CameraView />}
        {activeTab === 'lenses' && <LensView />}
        {activeTab === 'accessories' && <AccessoryView />}
        {activeTab === 'mounts' && <MountView />}
      </main>
    </div>
  );
};


// =================================================================
// VISTA: KITS (CONFIGURACIONES)
// =================================================================
const KitView = () => {
  const [kits, setKits] = React.useState([]);
  const [bodies, setBodies] = React.useState([]);
  const [lenses, setLenses] = React.useState([]);
  const [accessories, setAccessories] = React.useState([]);
  const [filmFormats, setFilmFormats] = React.useState([]);
  const [negativeSizes, setNegativeSizes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingKit, setEditingKit] = React.useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [rK, rB, rL, rA, rF, rS] = await Promise.all([
        fetch('/api/v1/kits/'),
        fetch('/api/v1/camerabody/').catch(() => null),
        fetch('/api/v1/lenses/').catch(() => null),
        fetch('/api/v1/accessories/').catch(() => null),
        fetch('/api/v1/film-formats/').catch(() => null),
        fetch('/api/v1/negative-sizes/').catch(() => null),
      ]);
      if (rK.ok) setKits(await rK.json());
      if (rB && rB.ok) setBodies(await rB.json());
      if (rL && rL.ok) setLenses(await rL.json());
      if (rA && rA.ok) setAccessories(await rA.json());
      if (rF && rF.ok) setFilmFormats(await rF.json());
      if (rS && rS.ok) setNegativeSizes(await rS.json());
    } finally { setLoading(false); }
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta configuración?')) return;
    await fetch(`/api/v1/kits/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  const handleSave = async (formData) => {
    const isEdit = Boolean(editingKit);
    const url = isEdit ? `/api/v1/kits/${editingKit.id}/` : '/api/v1/kits/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(formData),
    });
    setIsModalOpen(false);
    fetchAll();
  };

  if (loading) return <div style={styles.center}>Cargando equipos...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Kits y Equipos de Disparo</h1>
        <button style={styles.btnPrimary} onClick={() => { setEditingKit(null); setIsModalOpen(true); }}>+ Ensamblar Kit</button>
      </div>

      <div style={styles.grid}>
        {kits.map(kit => (
          <div key={kit.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{kit.name}</h2>
              <span style={kit.is_active_setup ? styles.badgeActive : styles.badgeInactive}>
                {kit.is_active_setup ? 'Listo' : 'Incompleto'}
              </span>
            </div>
            <div style={styles.detailBox}>
              <p style={{ margin: 0 }}><strong>📷 Cuerpo:</strong> {kit.camera_body_detail ? `${kit.camera_body_detail.brand} ${kit.camera_body_detail.model}` : 'N/A'}</p>
            </div>
            <div style={styles.section}>
              <strong>🔍 Lentes:</strong>
              <div style={styles.tagContainer}>
                {kit.lenses_detail?.map(l => <span key={l.id} style={styles.tagPrimary}>{l.brand} {l.focal_length}</span>)}
              </div>
            </div>
            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(kit.id)}>🗑️ Eliminar</button>
              <button style={styles.btnEdit} onClick={() => { setEditingKit(kit); setIsModalOpen(true); }}>✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <KitModal kit={editingKit} bodies={bodies} lenses={lenses} accessories={accessories} filmFormats={filmFormats} negativeSizes={negativeSizes} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};


// MODAL DE KITS CON FILTRADO ESTRICTO
const KitModal = ({ kit, bodies, lenses, accessories, filmFormats, negativeSizes, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: kit?.name || '',
    camera_body: kit?.camera_body_detail ? kit.camera_body_detail.id : (kit?.camera_body || ''),
    lenses: kit ? kit.lenses_detail?.map(l => l.id) || [] : [],
    accessories: kit ? kit.accessories_detail?.map(a => a.id) || [] : [],
    active_film_format: kit?.active_film_format_detail ? kit.active_film_format_detail.id : '',
    active_negative_size: kit?.active_negative_size_detail ? kit.active_negative_size_detail.id : '',
    is_active_setup: kit?.is_active_setup ?? true,
    notes: kit?.notes || ''
  });

  const selectedBodyObj = React.useMemo(() => bodies.find(b => String(b.id) === String(formData.camera_body)), [formData.camera_body, bodies]);
  const bodyMountId = selectedBodyObj?.lens_mount_detail?.id || selectedBodyObj?.lens_mount;

  const filteredLenses = React.useMemo(() => {
    if (!bodyMountId) return lenses;
    return lenses.filter(lens => String(lens.lens_mount_detail?.id || lens.lens_mount) === String(bodyMountId));
  }, [bodyMountId, lenses]);

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{kit ? 'Editar Kit' : 'Nuevo Kit'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave({...formData, camera_body: parseInt(formData.camera_body)}); }}>
          <div style={styles.formGroup}>
            <label>Nombre (*):</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Cuerpo (*):</label>
            <select value={formData.camera_body} onChange={e => setFormData({...formData, camera_body: e.target.value})} required style={styles.input}>
              <option value="">-- Seleccionar --</option>
              {bodies.map(b => <option key={b.id} value={b.id}>{b.brand} {b.model}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Lentes Compatibles:</label>
            <select multiple value={formData.lenses} onChange={e => setFormData({...formData, lenses: Array.from(e.target.selectedOptions, o => parseInt(o.value))})} style={{...styles.input, height: '100px'}}>
              {filteredLenses.map(l => <option key={l.id} value={l.id}>{l.brand} {l.focal_length} {l.model}</option>)}
            </select>
          </div>
          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
            <button type="submit" style={styles.btnPrimary}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// =================================================================
// VISTAS SECUNDARIAS (Cámaras, Lentes, Accesorios, Monturas)
// =================================================================
const CameraView = () => <SimpleCatalog title="Catálogo de Cámaras" endpoint="/api/v1/camera-bodies/" brandKey="brand" modelKey="model" badgeKey="camera_type" />;
const LensView = () => <SimpleCatalog title="Catálogo de Lentes" endpoint="/api/v1/lenses/" brandKey="brand" modelKey="model" extraInfoKey="focal_length" />;
const AccessoryView = () => <SimpleCatalog title="Catálogo de Accesorios" endpoint="/api/v1/accessories/" brandKey="brand" modelKey="model" badgeKey="accessory_type" />;
const MountView = () => <SimpleCatalog title="Catálogo de Monturas" endpoint="/api/v1/lens-mounts/" brandKey="name" modelKey="description" />;

// Componente genérico para catálogos individuales en Modo Oscuro
const SimpleCatalog = ({ title, endpoint, brandKey, modelKey, badgeKey, extraInfoKey }) => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(endpoint)
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div style={styles.center}>Cargando...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>{title}</h1>
      </div>
      <div style={styles.grid}>
        {items.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>
                {item[brandKey]} {extraInfoKey ? item[extraInfoKey] : ''}
              </h2>
              {badgeKey && item[badgeKey] && <span style={styles.badge}>{item[badgeKey]}</span>}
            </div>
            {item[modelKey] && <p style={{ color: darkTheme.textMuted }}>{item[modelKey]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

// Render en el DOM
const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(<MainApp />);