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

const darkTheme = {
  bgApp: '#0f172a',
  bgCard: '#1e293b',
  bgModal: '#1e293b',
  bgInput: '#334155',
  border: '#334155',
  textMain: '#f8fafc',
  textMuted: '#94a3b8',
  primary: '#3b82f6',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
  },
  brandTitle: { fontSize: '1.25rem', fontWeight: 'bold', color: '#f8fafc', margin: 0 },
  navTabs: { display: 'flex', gap: '0.5rem' },
  navButton: (active) => ({
    backgroundColor: active ? '#3b82f6' : 'transparent',
    color: active ? '#ffffff' : '#94a3b8',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }),
  headerBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { color: darkTheme.textMain, margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' },
  card: { border: `1px solid ${darkTheme.border}`, borderRadius: '8px', padding: '1.5rem', backgroundColor: darkTheme.bgCard },
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
  
  btnPrimary: { backgroundColor: darkTheme.primary, color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnSecondary: { backgroundColor: '#334155', color: '#cbd5e1', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', marginRight: '0.5rem' },
  cardActions: { display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' },
  btnEdit: { backgroundColor: '#334155', color: '#f8fafc', border: `1px solid ${darkTheme.border}`, padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },
  btnDelete: { backgroundColor: darkTheme.dangerBg, color: darkTheme.dangerText, border: `1px solid ${darkTheme.dangerBorder}`, padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },

  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: darkTheme.bgModal, padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', border: `1px solid ${darkTheme.border}` },
  formGroup: { marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  input: { padding: '0.6rem', borderRadius: '6px', border: `1px solid ${darkTheme.border}`, backgroundColor: darkTheme.bgInput, color: darkTheme.textMain, fontSize: '0.9rem', width: '100%', boxSizing: 'border-box' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }
};

// =================================================================
// MAIN APP & NAVIGATION
// =================================================================
const MainApp = () => {
  const [activeTab, setActiveTab] = React.useState('kits');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkTheme.bgApp }}>
      <nav style={styles.navBar}>
        <div style={styles.brandTitle}>📷 Gabinete Fotográfico</div>
        <div style={styles.navTabs}>
          <button style={styles.navButton(activeTab === 'kits')} onClick={() => setActiveTab('kits')}>⚙️ Kits</button>
          <button style={styles.navButton(activeTab === 'cameras')} onClick={() => setActiveTab('cameras')}>📷 Cámaras</button>
          <button style={styles.navButton(activeTab === 'lenses')} onClick={() => setActiveTab('lenses')}>🔍 Lentes</button>
          <button style={styles.navButton(activeTab === 'accessories')} onClick={() => setActiveTab('accessories')}>📦 Accesorios</button>
          <button style={styles.navButton(activeTab === 'mounts')} onClick={() => setActiveTab('mounts')}>🔧 Monturas</button>
        </div>
      </nav>

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
// 1. SECCIÓN: KITS (CON FILTRADO ESTRICTO DE LENTES)
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
        fetch('/api/v1/camerabody/').catch(() => null), // ENDPOINT CORREGIDO
        fetch('/api/v1/lenses/').catch(() => null),
        fetch('/api/v1/accessories/').catch(() => null),
        fetch('/api/v1/film-formats/').catch(() => null),
        fetch('/api/v1/negative-sizes/').catch(() => null),
      ]);
      if (rK && rK.ok) setKits(await rK.json());
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

  if (loading) return <div style={styles.center}>Cargando kits...</div>;

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
              <strong>🔍 Lentes Incluidos:</strong>
              <div style={styles.tagContainer}>
                {kit.lenses_detail?.map(l => <span key={l.id} style={styles.tagPrimary}>{l.brand} {l.focal_length} ({l.model})</span>)}
              </div>
            </div>
            <div style={styles.section}>
              <strong>📦 Accesorios:</strong>
              <div style={styles.tagContainer}>
                {kit.accessories_detail?.map(a => <span key={a.id} style={styles.tagDark}>{a.brand} {a.model}</span>)}
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
            <label>
              Lentes Compatibles (Ctrl/Cmd para varios):
              {selectedBodyObj && <span style={{fontSize: '0.8rem', color: '#60a5fa', display: 'block'}}>Filtrando por montura: {selectedBodyObj.lens_mount_detail?.name || 'ID ' + bodyMountId}</span>}
            </label>
            <select multiple value={formData.lenses} onChange={e => setFormData({...formData, lenses: Array.from(e.target.selectedOptions, o => parseInt(o.value))})} style={{...styles.input, height: '110px'}}>
              {filteredLenses.map(l => <option key={l.id} value={l.id}>{l.brand} {l.focal_length} {l.model}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Accesorios (Ctrl/Cmd para varios):</label>
            <select multiple value={formData.accessories} onChange={e => setFormData({...formData, accessories: Array.from(e.target.selectedOptions, o => parseInt(o.value))})} style={{...styles.input, height: '90px'}}>
              {accessories.map(a => <option key={a.id} value={a.id}>[{a.brand}] {a.model}</option>)}
            </select>
          </div>
          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
            <button type="submit" style={styles.btnPrimary}>Guardar Kit</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// =================================================================
// 2. SECCIÓN: CÁMARAS (ENDPOINT /api/v1/camerabody/)
// =================================================================
const CameraView = () => {
  const [cameras, setCameras] = React.useState([]);
  const [mounts, setMounts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCamera, setEditingCamera] = React.useState(null);

  const fetchAll = async () => {
    setLoading(true);
    const [rC, rM] = await Promise.all([
      fetch('/api/v1/camerabody/'), // ENDPOINT CORREGIDO
      fetch('/api/v1/lens-mounts/').catch(() => null),
    ]);
    if (rC && rC.ok) setCameras(await rC.json());
    if (rM && rM.ok) setMounts(await rM.json());
    setLoading(false);
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta cámara?')) return;
    await fetch(`/api/v1/camerabody/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  const handleSave = async (formData) => {
    const isEdit = Boolean(editingCamera);
    const url = isEdit ? `/api/v1/camerabody/${editingCamera.id}/` : '/api/v1/camerabody/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(formData),
    });
    setIsModalOpen(false);
    fetchAll();
  };

  if (loading) return <div style={styles.center}>Cargando cámaras...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Catálogo de Cámaras</h1>
        <button style={styles.btnPrimary} onClick={() => { setEditingCamera(null); setIsModalOpen(true); }}>+ Agregar Cámara</button>
      </div>

      <div style={styles.grid}>
        {cameras.map(cam => (
          <div key={cam.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{cam.brand} {cam.model}</h2>
              <span style={styles.badge}>{cam.camera_type}</span>
            </div>
            <p><strong>Montura:</strong> {cam.lens_mount_detail ? cam.lens_mount_detail.name : 'No asignada'}</p>
            <p><strong>Mecanismo:</strong> {cam.mechanism_type}</p>
            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(cam.id)}>🗑️ Eliminar</button>
              <button style={styles.btnEdit} onClick={() => { setEditingCamera(cam); setIsModalOpen(true); }}>✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CameraModal camera={editingCamera} mounts={mounts} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const CameraModal = ({ camera, mounts, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    brand: camera?.brand || '',
    model: camera?.model || '',
    camera_type: camera?.camera_type || 'SLR',
    mechanism_type: camera?.mechanism_type || 'MECHANICAL',
    lens_mount: camera?.lens_mount_detail ? camera.lens_mount_detail.id : (camera?.lens_mount || ''),
  });

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{camera ? 'Editar Cámara' : 'Nueva Cámara'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave({...formData, lens_mount: formData.lens_mount ? parseInt(formData.lens_mount) : null}); }}>
          <div style={styles.formGroup}>
            <label>Marca (*):</label>
            <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Modelo (*):</label>
            <input type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Tipo:</label>
            <select value={formData.camera_type} onChange={e => setFormData({...formData, camera_type: e.target.value})} style={styles.input}>
              <option value="SLR">SLR</option>
              <option value="RANGEFINDER">Rangefinder</option>
              <option value="TLR">TLR</option>
              <option value="POINT_AND_SHOOT">Point & Shoot</option>
              <option value="MEDIUM_FORMAT_SYSTEM">Medio Formato</option>
              <option value="LARGE_FORMAT_VIEW">Gran Formato</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Montura:</label>
            <select value={formData.lens_mount} onChange={e => setFormData({...formData, lens_mount: e.target.value})} style={styles.input}>
              <option value="">-- Sin Montura / No aplica --</option>
              {mounts.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
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
// 3. SECCIÓN: LENTES
// =================================================================
const LensView = () => {
  const [lenses, setLenses] = React.useState([]);
  const [mounts, setMounts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingLens, setEditingLens] = React.useState(null);

  const fetchAll = async () => {
    setLoading(true);
    const [rL, rM] = await Promise.all([
      fetch('/api/v1/lenses/'),
      fetch('/api/v1/lens-mounts/').catch(() => null),
    ]);
    if (rL && rL.ok) setLenses(await rL.json());
    if (rM && rM.ok) setMounts(await rM.json());
    setLoading(false);
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este lente?')) return;
    await fetch(`/api/v1/lenses/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  const handleSave = async (formData) => {
    const isEdit = Boolean(editingLens);
    const url = isEdit ? `/api/v1/lenses/${editingLens.id}/` : '/api/v1/lenses/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(formData),
    });
    setIsModalOpen(false);
    fetchAll();
  };

  if (loading) return <div style={styles.center}>Cargando lentes...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Catálogo de Lentes</h1>
        <button style={styles.btnPrimary} onClick={() => { setEditingLens(null); setIsModalOpen(true); }}>+ Agregar Lente</button>
      </div>

      <div style={styles.grid}>
        {lenses.map(lens => (
          <div key={lens.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{lens.brand} {lens.focal_length} {lens.max_aperture || ''}</h2>
              <span style={styles.badge}>{lens.lens_mount_detail ? lens.lens_mount_detail.name : 'Sin montura'}</span>
            </div>
            <p><strong>Modelo:</strong> {lens.model}</p>
            <p><strong>Serie:</strong> {lens.serial_number || 'N/A'}</p>
            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(lens.id)}>🗑️ Eliminar</button>
              <button style={styles.btnEdit} onClick={() => { setEditingLens(lens); setIsModalOpen(true); }}>✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <LensModal lens={editingLens} mounts={mounts} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const LensModal = ({ lens, mounts, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    brand: lens?.brand || '',
    model: lens?.model || '',
    focal_length: lens?.focal_length || '',
    max_aperture: lens?.max_aperture || '',
    serial_number: lens?.serial_number || '',
    lens_mount: lens?.lens_mount_detail ? lens.lens_mount_detail.id : (lens?.lens_mount || ''),
  });

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{lens ? 'Editar Lente' : 'Nuevo Lente'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave({...formData, lens_mount: formData.lens_mount ? parseInt(formData.lens_mount) : null}); }}>
          <div style={styles.formGroup}>
            <label>Marca (*):</label>
            <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Distancia Focal (*):</label>
            <input type="text" value={formData.focal_length} onChange={e => setFormData({...formData, focal_length: e.target.value})} placeholder="Ej. 80mm, 70-210mm" required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Apertura Máxima:</label>
            <input type="text" value={formData.max_aperture} onChange={e => setFormData({...formData, max_aperture: e.target.value})} placeholder="Ej. f/2.8" style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Nombre / Modelo (*):</label>
            <input type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Montura:</label>
            <select value={formData.lens_mount} onChange={e => setFormData({...formData, lens_mount: e.target.value})} style={styles.input}>
              <option value="">-- Seleccionar Montura --</option>
              {mounts.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
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
// 4. SECCIÓN: ACCESORIOS (COMPLETO CON FORMULARIO/MODAL)
// =================================================================
const AccessoryView = () => {
  const [accessories, setAccessories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingAccessory, setEditingAccessory] = React.useState(null);

  const fetchAll = async () => {
    setLoading(true);
    const res = await fetch('/api/v1/accessories/').catch(() => null);
    if (res && res.ok) setAccessories(await res.json());
    setLoading(false);
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este accesorio?')) return;
    await fetch(`/api/v1/accessories/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  const handleSave = async (formData) => {
    const isEdit = Boolean(editingAccessory);
    const url = isEdit ? `/api/v1/accessories/${editingAccessory.id}/` : '/api/v1/accessories/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(formData),
    });
    setIsModalOpen(false);
    fetchAll();
  };

  if (loading) return <div style={styles.center}>Cargando accesorios...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Catálogo de Accesorios</h1>
        <button style={styles.btnPrimary} onClick={() => { setEditingAccessory(null); setIsModalOpen(true); }}>+ Agregar Accesorio</button>
      </div>

      <div style={styles.grid}>
        {accessories.map(acc => (
          <div key={acc.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{acc.brand} {acc.model}</h2>
              <span style={styles.badge}>{acc.accessory_type}</span>
            </div>
            <p><strong>Nº Serie:</strong> {acc.serial_number || 'N/A'}</p>
            {acc.notes && <p style={{ fontSize: '0.85rem', color: darkTheme.textMuted }}><em>{acc.notes}</em></p>}
            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(acc.id)}>🗑️ Eliminar</button>
              <button style={styles.btnEdit} onClick={() => { setEditingAccessory(acc); setIsModalOpen(true); }}>✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <AccessoryModal accessory={editingAccessory} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const AccessoryModal = ({ accessory, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    brand: accessory?.brand || '',
    model: accessory?.model || '',
    accessory_type: accessory?.accessory_type || 'OTHER',
    serial_number: accessory?.serial_number || '',
    notes: accessory?.notes || '',
  });

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{accessory ? 'Editar Accesorio' : 'Nuevo Accesorio'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div style={styles.formGroup}>
            <label>Marca (*):</label>
            <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Modelo / Nombre (*):</label>
            <input type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Tipo de Accesorio:</label>
            <select value={formData.accessory_type} onChange={e => setFormData({...formData, accessory_type: e.target.value})} style={styles.input}>
              <option value="FILM_BACK">Respaldo / Magazine</option>
              <option value="VIEWFINDER">Visor / Prisma</option>
              <option value="DARK_SLIDE">Chasis / Dark Slide</option>
              <option value="LENS_BOARD">Tabla de Lente (Lens Board)</option>
              <option value="MOTOR_DRIVE">Motor / Winder</option>
              <option value="ADAPTER">Adaptador</option>
              <option value="HOOD">Parasol / Compendio</option>
              <option value="OTHER">Otro</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Nº de Serie:</label>
            <input type="text" value={formData.serial_number} onChange={e => setFormData({...formData, serial_number: e.target.value})} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Notas:</label>
            <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} rows="2" style={styles.input} />
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
// 5. SECCIÓN: MONTURAS
// =================================================================
const MountView = () => {
  const [mounts, setMounts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchAll = () => {
    setLoading(true);
    fetch('/api/v1/lens-mounts/').then(r => r.json()).then(data => { setMounts(data); setLoading(false); });
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta montura?')) return;
    await fetch(`/api/v1/lens-mounts/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  if (loading) return <div style={styles.center}>Cargando monturas...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Catálogo de Monturas</h1>
      </div>
      <div style={styles.grid}>
        {mounts.map(m => (
          <div key={m.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{m.name}</h2>
            </div>
            {m.description && <p style={{ color: darkTheme.textMuted }}>{m.description}</p>}
            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(m.id)}>🗑️ Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(<MainApp />);