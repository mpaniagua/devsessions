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
// PALETA DE COLORES TEMA ASTROPLATE
// =================================================================
const darkTheme = {
  bgApp: '#18181b',
  bgCard: '#27272a',
  bgModal: '#27272a',
  bgInput: '#18181b',
  border: '#3f3f46',
  textMain: '#f4f4f5',
  textMuted: '#a1a1aa',
  primary: '#f4f4f5',
  primaryText: '#18181b',
  accentTag: '#3f3f46',
  accentTagText: '#f4f4f5',
  greenTag: '#14532d',
  greenTagText: '#86efac',
  dangerBg: '#450a0a',
  dangerBorder: '#7f1d1d',
  dangerText: '#fca5a5',
};

const styles = {
  container: { padding: '2.5rem 2rem', maxWidth: '1200px', margin: '0 auto' },
  navBar: {
    backgroundColor: '#18181b',
    borderBottom: `1px solid ${darkTheme.border}`,
    padding: '1.2rem 2.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
  },
  brandTitle: { fontSize: '1.35rem', fontWeight: '800', color: darkTheme.textMain, margin: 0, letterSpacing: '-0.025em' },
  navTabs: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' },
  navButton: (active) => ({
    backgroundColor: active ? '#27272a' : 'transparent',
    color: active ? '#ffffff' : darkTheme.textMuted,
    border: active ? `1px solid ${darkTheme.border}` : '1px solid transparent',
    padding: '0.5rem 0.9rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.85rem',
    transition: 'all 0.2s ease',
  }),
  headerBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { color: darkTheme.textMain, margin: 0, fontWeight: '800', fontSize: '1.8rem', letterSpacing: '-0.025em' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' },
  card: { border: `1px solid ${darkTheme.border}`, borderRadius: '12px', padding: '1.75rem', backgroundColor: darkTheme.bgCard, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  badge: { backgroundColor: '#3f3f46', color: '#f4f4f5', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' },
  badgeActive: { backgroundColor: darkTheme.greenTag, color: darkTheme.greenTagText, padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' },
  badgeInactive: { backgroundColor: darkTheme.dangerBg, color: darkTheme.dangerText, padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' },
  detailBox: { backgroundColor: '#18181b', padding: '0.9rem', borderRadius: '8px', borderLeft: `4px solid ${darkTheme.textMain}`, margin: '0.6rem 0' },
  section: { marginTop: '1rem' },
  tagContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' },
  tagPrimary: { backgroundColor: darkTheme.accentTag, color: darkTheme.accentTagText, padding: '0.25rem 0.55rem', borderRadius: '6px', fontSize: '0.825rem' },
  tagDark: { backgroundColor: '#18181b', color: '#e4e4e7', padding: '0.25rem 0.55rem', borderRadius: '6px', fontSize: '0.80rem', border: `1px solid ${darkTheme.border}` },
  center: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: darkTheme.textMuted },
  btnPrimary: { backgroundColor: darkTheme.primary, color: darkTheme.primaryText, border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' },
  btnSecondary: { backgroundColor: '#3f3f46', color: '#f4f4f5', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', marginRight: '0.5rem', fontWeight: '600' },
  cardActions: { display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' },
  btnEdit: { backgroundColor: '#3f3f46', color: '#f4f4f5', border: `1px solid ${darkTheme.border}`, padding: '0.45rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  btnDelete: { backgroundColor: darkTheme.dangerBg, color: darkTheme.dangerText, border: `1px solid ${darkTheme.dangerBorder}`, padding: '0.45rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: darkTheme.bgModal, padding: '2.25rem', borderRadius: '12px', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto', border: `1px solid ${darkTheme.border}` },
  formGroup: { marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  input: { padding: '0.65rem 0.8rem', borderRadius: '8px', border: `1px solid ${darkTheme.border}`, backgroundColor: darkTheme.bgInput, color: darkTheme.textMain, fontSize: '0.9rem', width: '100%', boxSizing: 'border-box' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', marginTop: '1.75rem' }
};

// =================================================================
// MAIN APP & AUTHENTICATION STATE
// =================================================================
const MainApp = () => {
  const [user, setUser] = React.useState(null);
  const [checkingAuth, setCheckingAuth] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('sessions');

  const checkUserAuth = async () => {
    try {
      const res = await fetch('/api/v1/auth/user/');
      if (res.ok) {
        const data = await res.json();
        if (data.is_authenticated) setUser(data.username);
        else setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  React.useEffect(() => { checkUserAuth(); }, []);

  const handleLogout = async () => {
    await fetch('/api/v1/auth/logout/', {
      method: 'POST',
      headers: { 'X-CSRFToken': getCookie('csrftoken') }
    });
    setUser(null);
  };

  if (checkingAuth) {
    return <div style={{ ...styles.center, minHeight: '100vh', backgroundColor: darkTheme.bgApp }}>Verificando credenciales...</div>;
  }

  if (!user) {
    return <LoginView onLoginSuccess={(username) => setUser(username)} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkTheme.bgApp, color: darkTheme.textMain }}>
      <nav style={styles.navBar}>
        
        <div style={styles.brandTitle}>🚀  Gabinete Fotografico</div>
        <div style={styles.navTabs}>
          <button style={styles.navButton(activeTab === 'sessions')} onClick={() => setActiveTab('sessions')}>📸 Sesiones</button>
          <button style={styles.navButton(activeTab === 'kits')} onClick={() => setActiveTab('kits')}>⚙️ Kits</button>
          <button style={styles.navButton(activeTab === 'cameras')} onClick={() => setActiveTab('cameras')}>📷 Cámaras</button>
          <button style={styles.navButton(activeTab === 'lenses')} onClick={() => setActiveTab('lenses')}>🔍 Lentes</button>
          <button style={styles.navButton(activeTab === 'emulsions')} onClick={() => setActiveTab('emulsions')}>🧪 Emulsiones</button>
          <button style={styles.navButton(activeTab === 'filmstocks')} onClick={() => setActiveTab('filmstocks')}>🎞️ Rollos / Placas</button>
          <button style={styles.navButton(activeTab === 'accessories')} onClick={() => setActiveTab('accessories')}>📦 Accesorios</button>
          <button style={styles.navButton(activeTab === 'mounts')} onClick={() => setActiveTab('mounts')}>🔧 Monturas</button>
          
          <button onClick={handleLogout} style={{ ...styles.btnDelete, marginLeft: '1rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            🚪 Salir ({user})
          </button>
        </div>
      </nav>

      <main style={styles.container}>
        {activeTab === 'sessions' && <SessionView />}
        {activeTab === 'kits' && <KitView />}
        {activeTab === 'cameras' && <CameraView />}
        {activeTab === 'lenses' && <LensView />}
        {activeTab === 'emulsions' && <EmulsionView />}
        {activeTab === 'filmstocks' && <FilmStockView />}
        {activeTab === 'accessories' && <AccessoryView />}
        {activeTab === 'mounts' && <MountView />}
      </main>
    </div>
  );
};

// =================================================================
// VISTA DE LOGIN
// =================================================================
const LoginView = ({ onLoginSuccess }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data.username);
      } else {
        setError(data.detail || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkTheme.bgApp, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <div style={{ ...styles.card, width: '100%', maxWidth: '400px', backgroundColor: darkTheme.bgModal }}>
        
        <h1 style={{ ...styles.brandTitle, textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.6rem' }}> <i class="bi bi-camera"></i>   Gabinete Fotografico</h1>
       
        <p style={{ textAlign: 'center', color: darkTheme.textMuted, fontSize: '0.85rem', marginBottom: '2rem' }}>Acceso al sistema de gestión fotográfica</p>

        {error && (
          <div style={{ backgroundColor: darkTheme.dangerBg, color: darkTheme.dangerText, border: `1px solid ${darkTheme.dangerBorder}`, padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Usuario:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required autoFocus style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Contraseña:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={styles.input} />
          </div>

          <button type="submit" disabled={loading} style={{ ...styles.btnPrimary, width: '100%', padding: '0.75rem', marginTop: '1rem' }}>
            {loading ? 'Iniciando sesión...' : 'Ingresar al Gabinete'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ... Resto de componentes (SessionView, KitView, CameraView, LensView, EmulsionView, FilmStockView, AccessoryView, MountView)
// =================================================================
// 1. SECCIÓN: SESIONES FOTOGRÁFICAS
// =================================================================
const SessionView = () => {
  const [sessions, setSessions] = React.useState([]);
  const [kits, setKits] = React.useState([]);
  const [filmStocks, setFilmStocks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);

  const fetchAll = async () => {
    setLoading(true);
    const [rS, rK, rF] = await Promise.all([
      fetch('/api/v1/sessions/').catch(() => null),
      fetch('/api/v1/kits/').catch(() => null),
      fetch('/api/v1/film-stocks/').catch(() => null),
    ]);
    if (rS && rS.ok) setSessions(await rS.json());
    if (rK && rK.ok) setKits(await rK.json());
    if (rF && rF.ok) setFilmStocks(await rF.json());
    setLoading(false);
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta sesión fotográfica?')) return;
    await fetch(`/api/v1/sessions/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  const handleSave = async (payload) => {
    const isEdit = Boolean(editingItem);
    const url = isEdit ? `/api/v1/sessions/${editingItem.id}/` : '/api/v1/sessions/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(payload),
    });
    setIsModalOpen(false);
    fetchAll();
  };

  if (loading) return <div style={styles.center}>Cargando sesiones fotográficas...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Sesiones Fotográficas</h1>
        <button style={styles.btnPrimary} onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>+ Nueva Sesión</button>
      </div>

      <div style={styles.grid}>
        {sessions.map(s => (
          <div key={s.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{s.title}</h2>
              <span style={styles.badge}>
                {s.start_date} {s.end_date ? ` al ${s.end_date}` : ''}
              </span>
            </div>

            <div style={styles.detailBox}>
              <p style={{ margin: 0 }}>
                <strong>⚙️ Kit:</strong> {s.kit_detail ? s.kit_detail.name : 'Sin kit asignado'}
              </p>
              {s.location && (
                <p style={{ margin: '0.3rem 0 0 0' }}>
                  <strong>📍 Locación:</strong> {s.location} {s.is_multiple_locations ? '(Múltiples puntos)' : ''}
                </p>
              )}
            </div>

            <div style={styles.section}>
              <strong style={{ color: darkTheme.textMuted }}>🎞️ Película Expuesta:</strong>
              <div style={styles.tagContainer}>
                {s.film_stocks_detail && s.film_stocks_detail.length > 0 ? (
                  s.film_stocks_detail.map(st => (
                    <span key={st.id} style={styles.tagPrimary}>
                      [{st.roll_code || 'ID ' + st.id}] {st.emulsion_detail ? `${st.emulsion_detail.manufacturer} ${st.emulsion_detail.name}` : 'Película'}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.85rem', color: darkTheme.textMuted }}>Sin rollos/placas asociados</span>
                )}
              </div>
            </div>

            {s.notes && (
              <p style={{ fontSize: '0.85rem', marginTop: '0.8rem', color: darkTheme.textMuted }}>
                <em>{s.notes}</em>
              </p>
            )}

            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(s.id)}>🗑️ Eliminar</button>
              <button style={styles.btnEdit} onClick={() => { setEditingItem(s); setIsModalOpen(true); }}>✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <SessionModal item={editingItem} kits={kits} filmStocks={filmStocks} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const SessionModal = ({ item, kits, filmStocks, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    title: item?.title || '',
    kit: item?.kit_detail ? item.kit_detail.id : (item?.kit || ''),
    film_stocks: item ? item.film_stocks_detail?.map(f => f.id) || [] : [],
    start_date: item?.start_date || new Date().toISOString().split('T')[0],
    end_date: item?.end_date || '',
    location: item?.location || '',
    is_multiple_locations: item?.is_multiple_locations ?? false,
    locations_detail: item?.locations_detail || '',
    notes: item?.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      kit: formData.kit ? parseInt(formData.kit, 10) : null,
      film_stocks: formData.film_stocks || [],
      start_date: formData.start_date,
      end_date: formData.end_date || null,
      location: formData.location || null,
      is_multiple_locations: Boolean(formData.is_multiple_locations),
      locations_detail: formData.locations_detail || null,
      notes: formData.notes || null
    };
    onSave(payload);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={{ marginTop: 0, fontWeight: '800' }}>{item ? 'Editar Sesión' : 'Nueva Sesión Fotográfica'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Título / Proyecto (*):</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Kit Utilizado:</label>
            <select value={formData.kit} onChange={e => setFormData({...formData, kit: e.target.value})} style={styles.input}>
              <option value="">-- Seleccionar Kit --</option>
              {kits.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Rollos / Placas Expuestos (Ctrl/Cmd para varios):</label>
            <select multiple value={formData.film_stocks} onChange={e => setFormData({...formData, film_stocks: Array.from(e.target.selectedOptions, o => parseInt(o.value, 10))})} style={{...styles.input, height: '100px'}}>
              {filmStocks.map(st => (
                <option key={st.id} value={st.id}>
                  [{st.roll_code || 'ID ' + st.id}] {st.emulsion_detail ? `${st.emulsion_detail.manufacturer} ${st.emulsion_detail.name}` : 'Película'}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={styles.formGroup}>
              <label>Fecha Inicio (*):</label>
              <input type="date" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} required style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label>Fecha Término:</label>
              <input type="date" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} style={styles.input} />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label>Locación Principal:</label>
            <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={styles.input} />
          </div>
          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
            <button type="submit" style={styles.btnPrimary}>Guardar Sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =================================================================
// 2. SECCIÓN: KITS
// =================================================================
const KitView = () => {
  const [kits, setKits] = React.useState([]);
  const [bodies, setBodies] = React.useState([]);
  const [lenses, setLenses] = React.useState([]);
  const [accessories, setAccessories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingKit, setEditingKit] = React.useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [rK, rB, rL, rA] = await Promise.all([
        fetch('/api/v1/kits/').catch(() => null),
        fetch('/api/v1/camerabody/').catch(() => null),
        fetch('/api/v1/lenses/').catch(() => null),
        fetch('/api/v1/accessories/').catch(() => null),
      ]);
      if (rK && rK.ok) setKits(await rK.json());
      if (rB && rB.ok) setBodies(await rB.json());
      if (rL && rL.ok) setLenses(await rL.json());
      if (rA && rA.ok) setAccessories(await rA.json());
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
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{kit.name}</h2>
              <span style={kit.is_active_setup ? styles.badgeActive : styles.badgeInactive}>
                {kit.is_active_setup ? 'Listo' : 'Incompleto'}
              </span>
            </div>
            <div style={styles.detailBox}>
              <p style={{ margin: 0 }}><strong>📷 Cuerpo:</strong> {kit.camera_body_detail ? `${kit.camera_body_detail.brand} ${kit.camera_body_detail.model}` : 'N/A'}</p>
            </div>
            <div style={styles.section}>
              <strong style={{ color: darkTheme.textMuted }}>🔍 Lentes Incluidos:</strong>
              <div style={styles.tagContainer}>
                {kit.lenses_detail?.map(l => <span key={l.id} style={styles.tagPrimary}>{l.brand} {l.focal_length} ({l.model})</span>)}
              </div>
            </div>
            <div style={styles.section}>
              <strong style={{ color: darkTheme.textMuted }}>📦 Accesorios:</strong>
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
        <KitModal kit={editingKit} bodies={bodies} lenses={lenses} accessories={accessories} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const KitModal = ({ kit, bodies, lenses, accessories, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: kit?.name || '',
    camera_body: kit?.camera_body_detail ? kit.camera_body_detail.id : (kit?.camera_body || ''),
    lenses: kit ? kit.lenses_detail?.map(l => l.id) || [] : [],
    accessories: kit ? kit.accessories_detail?.map(a => a.id) || [] : [],
    is_active_setup: kit?.is_active_setup ?? true,
    notes: kit?.notes || ''
  });

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={{ marginTop: 0, fontWeight: '800' }}>{kit ? 'Editar Kit' : 'Nuevo Kit'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave({...formData, camera_body: parseInt(formData.camera_body, 10)}); }}>
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
            <label>Lentes (Ctrl/Cmd para varios):</label>
            <select multiple value={formData.lenses} onChange={e => setFormData({...formData, lenses: Array.from(e.target.selectedOptions, o => parseInt(o.value, 10))})} style={{...styles.input, height: '100px'}}>
              {lenses.map(l => <option key={l.id} value={l.id}>{l.brand} {l.focal_length} {l.model}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Accesorios (Ctrl/Cmd para varios):</label>
            <select multiple value={formData.accessories} onChange={e => setFormData({...formData, accessories: Array.from(e.target.selectedOptions, o => parseInt(o.value, 10))})} style={{...styles.input, height: '90px'}}>
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
// 3. SECCIÓN: CÁMARAS (COMPLETO RESTAURADO)
// =================================================================
const CameraView = () => {
  const [cameras, setCameras] = React.useState([]);
  const [mounts, setMounts] = React.useState([]);
  const [formats, setFormats] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCamera, setEditingCamera] = React.useState(null);

  const fetchAll = async () => {
    setLoading(true);
    const [rC, rM, rF, rS] = await Promise.all([
      fetch('/api/v1/camerabody/').catch(() => null),
      fetch('/api/v1/lens-mounts/').catch(() => null),
      fetch('/api/v1/film-formats/').catch(() => null),
      fetch('/api/v1/negative-sizes/').catch(() => null),
    ]);
    if (rC && rC.ok) setCameras(await rC.json());
    if (rM && rM.ok) setMounts(await rM.json());
    if (rF && rF.ok) setFormats(await rF.json());
    if (rS && rS.ok) setSizes(await rS.json());
    setLoading(false);
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta cámara?')) return;
    await fetch(`/api/v1/camerabody/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  const handleSave = async (payload) => {
    const isEdit = Boolean(editingCamera);
    const url = isEdit ? `/api/v1/camerabody/${editingCamera.id}/` : '/api/v1/camerabody/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(payload),
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
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{cam.brand} {cam.model}</h2>
              <span style={styles.badge}>{cam.camera_type}</span>
            </div>
            <p><strong>Montura:</strong> {cam.lens_mount_detail ? cam.lens_mount_detail.name : 'No asignada'}</p>
            <p><strong>Mecanismo:</strong> {cam.mechanism_type}</p>
            {cam.release_year && <p><strong>Año:</strong> {cam.release_year}</p>}
            {cam.has_light_meter && <p style={{ color: darkTheme.greenTagText }}>✔ Exposímetro integrado</p>}
            {cam.notes && <p style={{ fontSize: '0.85rem', color: darkTheme.textMuted }}><em>{cam.notes}</em></p>}
            
            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(cam.id)}>🗑️ Eliminar</button>
              <button style={styles.btnEdit} onClick={() => { setEditingCamera(cam); setIsModalOpen(true); }}>✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CameraModal camera={editingCamera} mounts={mounts} formats={formats} sizes={sizes} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const CameraModal = ({ camera, mounts, formats, sizes, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    brand: camera?.brand || '',
    model: camera?.model || '',
    camera_type: camera?.camera_type || 'SLR',
    mechanism_type: camera?.mechanism_type || 'MECHANICAL',
    has_light_meter: camera?.has_light_meter ?? false,
    has_interchangeable_lens: camera?.has_interchangeable_lens ?? true,
    lens_mount: camera?.lens_mount_detail ? camera.lens_mount_detail.id : (camera?.lens_mount || ''),
    release_year: camera?.release_year || '',
    film_formats: camera ? camera.film_formats_detail?.map(f => f.id) || [] : [],
    negative_sizes: camera ? camera.negative_sizes_detail?.map(s => s.id) || [] : [],
    notes: camera?.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      brand: formData.brand,
      model: formData.model,
      camera_type: formData.camera_type,
      mechanism_type: formData.mechanism_type,
      has_light_meter: Boolean(formData.has_light_meter),
      has_interchangeable_lens: Boolean(formData.has_interchangeable_lens),
      lens_mount: formData.lens_mount ? parseInt(formData.lens_mount, 10) : null,
      release_year: formData.release_year ? parseInt(formData.release_year, 10) : null,
      film_formats: formData.film_formats || [],
      negative_sizes: formData.negative_sizes || [],
      notes: formData.notes || ''
    };
    onSave(payload);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={{ marginTop: 0, fontWeight: '800' }}>{camera ? 'Editar Cámara' : 'Nueva Cámara'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Marca (*):</label>
            <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="Ej. Tachihara, Wista, Mamiya" required style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label>Modelo (*):</label>
            <input type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="Ej. 45SP, Super 23, Horseman 970" required style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label>Tipo de Cámara:</label>
            <select value={formData.camera_type} onChange={e => setFormData({...formData, camera_type: e.target.value})} style={styles.input}>
              <option value="SLR">SLR</option>
              <option value="RANGEFINDER">Rangefinder / Telelmétrica</option>
              <option value="TLR">TLR</option>
              <option value="POINT_AND_SHOOT">Point & Shoot</option>
              <option value="MEDIUM_FORMAT_SYSTEM">Medio Formato</option>
              <option value="LARGE_FORMAT_VIEW">Gran Formato / Field Camera</option>
              <option value="OTHER">Otro</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Mecanismo:</label>
            <select value={formData.mechanism_type} onChange={e => setFormData({...formData, mechanism_type: e.target.value})} style={styles.input}>
              <option value="MECHANICAL">Mecánico</option>
              <option value="ELECTRONIC">Electrónico</option>
              <option value="HYBRID">Híbrido</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Montura de Lente / Tabla:</label>
            <select value={formData.lens_mount} onChange={e => setFormData({...formData, lens_mount: e.target.value})} style={styles.input}>
              <option value="">-- Sin Montura / No aplica --</option>
              {mounts.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Año de Lanzamiento:</label>
            <input type="number" value={formData.release_year} onChange={e => setFormData({...formData, release_year: e.target.value})} placeholder="Ej. 1978" style={styles.input} />
          </div>

          <div style={{ ...styles.formGroup, flexDirection: 'row', alignItems: 'center', gap: '0.6rem' }}>
            <input type="checkbox" id="has_light_meter" checked={formData.has_light_meter} onChange={e => setFormData({...formData, has_light_meter: e.target.checked})} />
            <label htmlFor="has_light_meter" style={{ cursor: 'pointer' }}>¿Tiene exposímetro integrado?</label>
          </div>

          <div style={{ ...styles.formGroup, flexDirection: 'row', alignItems: 'center', gap: '0.6rem' }}>
            <input type="checkbox" id="has_interchangeable_lens" checked={formData.has_interchangeable_lens} onChange={e => setFormData({...formData, has_interchangeable_lens: e.target.checked})} />
            <label htmlFor="has_interchangeable_lens" style={{ cursor: 'pointer' }}>¿Lentes intercambiables?</label>
          </div>

          <div style={styles.formGroup}>
            <label>Formatos de Película Soportados (Ctrl/Cmd para varios):</label>
            <select multiple value={formData.film_formats} onChange={e => setFormData({...formData, film_formats: Array.from(e.target.selectedOptions, o => parseInt(o.value, 10))})} style={{...styles.input, height: '80px'}}>
              {formats.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Tamaños de Negativo Soportados (Ctrl/Cmd para varios):</label>
            <select multiple value={formData.negative_sizes} onChange={e => setFormData({...formData, negative_sizes: Array.from(e.target.selectedOptions, o => parseInt(o.value, 10))})} style={{...styles.input, height: '80px'}}>
              {sizes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Notas Adicionales:</label>
            <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} rows="2" placeholder="Ej. Movimientos de descentramiento y basculamiento" style={styles.input} />
          </div>

          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
            <button type="submit" style={styles.btnPrimary}>Guardar Cámara</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =================================================================
// 4. SECCIÓN: LENTES
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
      fetch('/api/v1/lenses/').catch(() => null),
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

  const handleSave = async (payload) => {
    const isEdit = Boolean(editingLens);
    const url = isEdit ? `/api/v1/lenses/${editingLens.id}/` : '/api/v1/lenses/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(payload),
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
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{lens.brand} {lens.focal_length} {lens.max_aperture || ''}</h2>
              <span style={styles.badge}>{lens.lens_mount_detail ? lens.lens_mount_detail.name : 'Sin montura'}</span>
            </div>
            <p><strong>Modelo:</strong> {lens.model}</p>
            {lens.serial_number && <p><strong>Serie:</strong> {lens.serial_number}</p>}
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
    filter_thread_size: lens?.filter_thread_size || '',
    has_included_hood: lens?.has_included_hood ?? false,
    notes: lens?.notes || ''
  });

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={{ marginTop: 0, fontWeight: '800' }}>{lens ? 'Editar Lente' : 'Nuevo Lente'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave({...formData, lens_mount: formData.lens_mount ? parseInt(formData.lens_mount, 10) : null}); }}>
          <div style={styles.formGroup}>
            <label>Marca (*):</label>
            <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Focal (*):</label>
            <input type="text" value={formData.focal_length} onChange={e => setFormData({...formData, focal_length: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Apertura Máxima:</label>
            <input type="text" value={formData.max_aperture} onChange={e => setFormData({...formData, max_aperture: e.target.value})} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Modelo (*):</label>
            <input type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Montura:</label>
            <select value={formData.lens_mount} onChange={e => setFormData({...formData, lens_mount: e.target.value})} style={styles.input}>
              <option value="">-- Seleccionar --</option>
              {mounts.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
            <button type="submit" style={styles.btnPrimary}>Guardar Lente</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =================================================================
// 5. SECCIÓN: EMULSIONES
// =================================================================
const EmulsionView = () => {
  const [emulsions, setEmulsions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);

  const fetchAll = async () => {
    setLoading(true);
    const res = await fetch('/api/v1/film-emulsions/').catch(() => null);
    if (res && res.ok) setEmulsions(await res.json());
    setLoading(false);
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta emulsión?')) return;
    await fetch(`/api/v1/film-emulsions/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  const handleSave = async (payload) => {
    const isEdit = Boolean(editingItem);
    const url = isEdit ? `/api/v1/film-emulsions/${editingItem.id}/` : '/api/v1/film-emulsions/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(payload),
    });
    setIsModalOpen(false);
    fetchAll();
  };

  if (loading) return <div style={styles.center}>Cargando emulsiones...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Catálogo de Emulsiones</h1>
        <button style={styles.btnPrimary} onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>+ Nueva Emulsión</button>
      </div>

      <div style={styles.grid}>
        {emulsions.map(em => (
          <div key={em.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{em.manufacturer} {em.name}</h2>
              <span style={styles.badge}>ISO {em.base_iso}</span>
            </div>
            <p><strong>Proceso:</strong> {em.process_type}</p>
            {em.description && <p style={{ fontSize: '0.85rem', color: darkTheme.textMuted }}><em>{em.description}</em></p>}
            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(em.id)}>🗑️ Eliminar</button>
              <button style={styles.btnEdit} onClick={() => { setEditingItem(em); setIsModalOpen(true); }}>✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <EmulsionModal item={editingItem} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const EmulsionModal = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    manufacturer: item?.manufacturer || '',
    name: item?.name || '',
    process_type: item?.process_type || 'BW',
    base_iso: item?.base_iso || 400,
    description: item?.description || '',
  });

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={{ marginTop: 0, fontWeight: '800' }}>{item ? 'Editar Emulsión' : 'Nueva Emulsión'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave({...formData, base_iso: parseInt(formData.base_iso, 10)}); }}>
          <div style={styles.formGroup}>
            <label>Fabricante (*):</label>
            <input type="text" value={formData.manufacturer} onChange={e => setFormData({...formData, manufacturer: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Nombre de Emulsión (*):</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Proceso:</label>
            <select value={formData.process_type} onChange={e => setFormData({...formData, process_type: e.target.value})} style={styles.input}>
              <option value="BW">Blanco y Negro (B&W)</option>
              <option value="C41">Color Negativo (C-41)</option>
              <option value="E6">Diapositiva (E-6)</option>
              <option value="ECN2">Cine (ECN-2)</option>
              <option value="OTHER">Otro</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>ISO Base (*):</label>
            <input type="number" value={formData.base_iso} onChange={e => setFormData({...formData, base_iso: e.target.value})} required style={styles.input} />
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
// 6. SECCIÓN: ROLLOS Y PLACAS
// =================================================================
const FilmStockView = () => {
  const [stocks, setStocks] = React.useState([]);
  const [emulsions, setEmulsions] = React.useState([]);
  const [formats, setFormats] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);
  const [accessories, setAccessories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);

  const fetchAll = async () => {
    setLoading(true);
    const [rS, rE, rF, rZ, rA] = await Promise.all([
      fetch('/api/v1/film-stocks/').catch(() => null),
      fetch('/api/v1/film-emulsions/').catch(() => null),
      fetch('/api/v1/film-formats/').catch(() => null),
      fetch('/api/v1/negative-sizes/').catch(() => null),
      fetch('/api/v1/accessories/').catch(() => null),
    ]);
    if (rS && rS.ok) setStocks(await rS.json());
    if (rE && rE.ok) setEmulsions(await rE.json());
    if (rF && rF.ok) setFormats(await rF.json());
    if (rZ && rZ.ok) setSizes(await rZ.json());
    if (rA && rA.ok) setAccessories(await rA.json());
    setLoading(false);
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta película?')) return;
    await fetch(`/api/v1/film-stocks/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  const handleSave = async (payload) => {
    const isEdit = Boolean(editingItem);
    const url = isEdit ? `/api/v1/film-stocks/${editingItem.id}/` : '/api/v1/film-stocks/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(payload),
    });
    setIsModalOpen(false);
    fetchAll();
  };

  if (loading) return <div style={styles.center}>Cargando película...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Rollos y Placas de Película</h1>
        <button style={styles.btnPrimary} onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>+ Registrar Rollo/Placa</button>
      </div>

      <div style={styles.grid}>
        {stocks.map(st => (
          <div key={st.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>
                {st.emulsion_detail ? `${st.emulsion_detail.manufacturer} ${st.emulsion_detail.name}` : 'Película'}
              </h2>
              <span style={st.status === 'EXPOSED' ? styles.badgeActive : styles.badge}>{st.status}</span>
            </div>

            <div style={styles.detailBox}>
              <p style={{ margin: 0 }}><strong>🎞️ Formato:</strong> {st.film_format_detail?.name} {st.negative_size_detail ? `(${st.negative_size_detail.name})` : ''}</p>
              <p style={{ margin: '0.3rem 0 0 0' }}><strong>📦 Respaldo:</strong> {st.film_back_detail ? `${st.film_back_detail.brand} ${st.film_back_detail.model}` : 'Sin asignar / Chasis'}</p>
            </div>

            <p><strong>ISO Expuesto:</strong> {st.exposed_iso}</p>
            {st.roll_code && <p><strong>Código:</strong> {st.roll_code}</p>}

            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(st.id)}>🗑️ Eliminar</button>
              <button style={styles.btnEdit} onClick={() => { setEditingItem(st); setIsModalOpen(true); }}>✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <FilmStockModal item={editingItem} emulsions={emulsions} formats={formats} sizes={sizes} accessories={accessories} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const FilmStockModal = ({ item, emulsions, formats, sizes, accessories, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    emulsion: item?.emulsion_detail ? item.emulsion_detail.id : (item?.emulsion || ''),
    film_format: item?.film_format_detail ? item.film_format_detail.id : (item?.film_format || ''),
    negative_size: item?.negative_size_detail ? item.negative_size_detail.id : (item?.negative_size || ''),
    film_back: item?.film_back_detail ? item.film_back_detail.id : (item?.film_back || ''),
    exposed_iso: item?.exposed_iso || 400,
    expositions_count: item?.expositions_count || 12,
    status: item?.status || 'FRESH',
    roll_code: item?.roll_code || '',
    notes: item?.notes || ''
  });

  const filmBackAccessories = React.useMemo(() => {
    return accessories.filter(a => a.accessory_type === 'FILM_BACK' || a.accessory_type === 'DARK_SLIDE');
  }, [accessories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      emulsion: parseInt(formData.emulsion, 10),
      film_format: parseInt(formData.film_format, 10),
      negative_size: formData.negative_size ? parseInt(formData.negative_size, 10) : null,
      film_back: formData.film_back ? parseInt(formData.film_back, 10) : null,
      exposed_iso: parseInt(formData.exposed_iso, 10),
      expositions_count: parseInt(formData.expositions_count, 10),
      status: formData.status,
      roll_code: formData.roll_code || null,
      notes: formData.notes || null
    };
    onSave(payload);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={{ marginTop: 0, fontWeight: '800' }}>{item ? 'Editar Rollo / Placa' : 'Registrar Rollo / Placa'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Emulsión (*):</label>
            <select value={formData.emulsion} onChange={e => setFormData({...formData, emulsion: e.target.value})} required style={styles.input}>
              <option value="">-- Seleccionar --</option>
              {emulsions.map(e => <option key={e.id} value={e.id}>{e.manufacturer} {e.name}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Formato (*):</label>
            <select value={formData.film_format} onChange={e => setFormData({...formData, film_format: e.target.value})} required style={styles.input}>
              <option value="">-- Seleccionar --</option>
              {formats.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Tamaño Negativo:</label>
            <select value={formData.negative_size} onChange={e => setFormData({...formData, negative_size: e.target.value})} style={styles.input}>
              <option value="">-- Seleccionar --</option>
              {sizes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Respaldo / Magazine / Chasis:</label>
            <select value={formData.film_back} onChange={e => setFormData({...formData, film_back: e.target.value})} style={styles.input}>
              <option value="">-- Sin asignar / Suelto --</option>
              {filmBackAccessories.map(a => (
                <option key={a.id} value={a.id}>
                  {a.brand} {a.model} {a.serial_number ? `(S/N: ${a.serial_number})` : ''}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>ISO Expuesto (*):</label>
            <input type="number" value={formData.exposed_iso} onChange={e => setFormData({...formData, exposed_iso: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Exposiciones (*):</label>
            <input type="number" value={formData.expositions_count} onChange={e => setFormData({...formData, expositions_count: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Código Lote (Opcional - Autogenerado si se deja vacío):</label>
            <input type="text" value={formData.roll_code} onChange={e => setFormData({...formData, roll_code: e.target.value})} placeholder="000000DDMMYY" style={styles.input} />
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
// 7. SECCIÓN: ACCESORIOS
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
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{acc.brand} {acc.model}</h2>
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
    accessory_type: accessory?.accessory_type || 'FILM_BACK',
    serial_number: accessory?.serial_number || '',
    notes: accessory?.notes || '',
  });

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={{ marginTop: 0, fontWeight: '800' }}>{accessory ? 'Editar Accesorio' : 'Nuevo Accesorio'}</h2>
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
            <label>Número de Serie:</label>
            <input type="text" value={formData.serial_number} onChange={e => setFormData({...formData, serial_number: e.target.value})} style={styles.input} />
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
// 8. SECCIÓN: MONTURAS
// =================================================================
const MountView = () => {
  const [mounts, setMounts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingMount, setEditingMount] = React.useState(null);

  const fetchAll = async () => {
    setLoading(true);
    const res = await fetch('/api/v1/lens-mounts/').catch(() => null);
    if (res && res.ok) setMounts(await res.json());
    setLoading(false);
  };

  React.useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta montura?')) return;
    await fetch(`/api/v1/lens-mounts/${id}/`, { method: 'DELETE', headers: { 'X-CSRFToken': getCookie('csrftoken') } });
    fetchAll();
  };

  const handleSave = async (formData) => {
    const isEdit = Boolean(editingMount);
    const url = isEdit ? `/api/v1/lens-mounts/${editingMount.id}/` : '/api/v1/lens-mounts/';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify(formData),
    });
    setIsModalOpen(false);
    fetchAll();
  };

  if (loading) return <div style={styles.center}>Cargando monturas...</div>;

  return (
    <div>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Catálogo de Monturas</h1>
        <button style={styles.btnPrimary} onClick={() => { setEditingMount(null); setIsModalOpen(true); }}>+ Agregar Montura</button>
      </div>

      <div style={styles.grid}>
        {mounts.map(m => (
          <div key={m.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{m.name}</h2>
            </div>
            {m.description && <p style={{ color: darkTheme.textMuted }}>{m.description}</p>}
            <div style={styles.cardActions}>
              <button style={styles.btnDelete} onClick={() => handleDelete(m.id)}>🗑️ Eliminar</button>
              <button style={styles.btnEdit} onClick={() => { setEditingMount(m); setIsModalOpen(true); }}>✏️ Editar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <MountModal mount={editingMount} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const MountModal = ({ mount, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: mount?.name || '',
    description: mount?.description || '',
  });

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={{ marginTop: 0, fontWeight: '800' }}>{mount ? 'Editar Montura' : 'Nueva Montura'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div style={styles.formGroup}>
            <label>Nombre (*):</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label>Descripción:</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" style={styles.input} />
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
// RENDERIZADO PRINCIPAL
// =================================================================
const rootContainer = document.getElementById('react-root');
if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);
  root.render(<MainApp />);
}