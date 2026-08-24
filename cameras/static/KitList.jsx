// static/js/KitList.jsx

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

const KitApp = () => {
  const [kits, setKits] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Catálogos
  const [bodies, setBodies] = React.useState([]);
  const [lenses, setLenses] = React.useState([]);
  const [accessories, setAccessories] = React.useState([]);
  const [filmFormats, setFilmFormats] = React.useState([]);
  const [negativeSizes, setNegativeSizes] = React.useState([]);

  // Modal y Edición
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingKit, setEditingKit] = React.useState(null);

  const API_KITS = '/api/v1/kits/';
  const API_BODIES = '/api/v1/camerabody/';
  const API_LENSES = '/api/v1/lenses/';
  const API_ACCESSORIES = '/api/v1/accessories/';
  const API_FORMATS = '/api/v1/film-formats/';
  const API_SIZES = '/api/v1/negative-sizes/';

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [resKits, resBodies, resLenses, resAcc, resFormats, resSizes] = await Promise.all([
        fetch(API_KITS),
        fetch(API_BODIES).catch(() => null),
        fetch(API_LENSES).catch(() => null),
        fetch(API_ACCESSORIES).catch(() => null),
        fetch(API_FORMATS).catch(() => null),
        fetch(API_SIZES).catch(() => null),
      ]);

      if (!resKits.ok) throw new Error(`Error HTTP: ${resKits.status}`);

      setKits(await resKits.json());
      if (resBodies && resBodies.ok) setBodies(await resBodies.json());
      if (resLenses && resLenses.ok) setLenses(await resLenses.json());
      if (resAcc && resAcc.ok) setAccessories(await resAcc.json());
      if (resFormats && resFormats.ok) setFilmFormats(await resFormats.json());
      if (resSizes && resSizes.ok) setNegativeSizes(await resSizes.json());

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAllData();
  }, []);

  const handleCreateNew = () => {
    setEditingKit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (kit) => {
    setEditingKit(kit);
    setIsModalOpen(true);
  };

  // NUEVA FUNCIÓN: Eliminar Kit
  const handleDelete = async (kit) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la configuración "${kit.name}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_KITS}${kit.id}/`, {
        method: 'DELETE',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.statusText}`);
      }

      // Recargar lista tras eliminar
      fetchAllData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSave = async (formData) => {
    try {
      const isEdit = Boolean(editingKit);
      const url = isEdit ? `${API_KITS}${editingKit.id}/` : API_KITS;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar: ${response.statusText}`);
      }

      setIsModalOpen(false);
      fetchAllData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div style={styles.center}>Cargando configuraciones de equipo...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Kits y Equipos de Disparo</h1>
        <button style={styles.btnPrimary} onClick={handleCreateNew}>
          + Ensamblar Nuevo Kit
        </button>
      </div>

      {kits.length === 0 ? (
        <p>No hay configuraciones registradas.</p>
      ) : (
        <div style={styles.grid}>
          {kits.map((kit) => (
            <div key={kit.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h2>{kit.name}</h2>
                <span style={kit.is_active_setup ? styles.badgeActive : styles.badgeInactive}>
                  {kit.is_active_setup ? 'Listo p/ Disparar' : 'Incompleto'}
                </span>
              </div>

              <div style={styles.kitDetailBox}>
                <p><strong>📷 Cuerpo:</strong> {kit.camera_body_detail ? `${kit.camera_body_detail.brand} ${kit.camera_body_detail.model}` : 'N/A'}</p>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#4a5568' }}>
                  <strong>Montura del Cuerpo:</strong> {kit.camera_body_detail?.lens_mount_detail ? kit.camera_body_detail.lens_mount_detail.name : 'No especificada'}
                </p>
              </div>

              {/* Lentes Incluidos */}
              <div style={styles.section}>
                <strong>🔍 Lentes Incluidos:</strong>
                <div style={styles.tagContainer}>
                  {kit.lenses_detail && kit.lenses_detail.length > 0 ? (
                    kit.lenses_detail.map((l) => (
                      <span key={l.id} style={styles.tagPrimary}>
                        {l.brand} {l.focal_length} {l.max_aperture || ''} ({l.model})
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: '#a0aec0' }}>Sin lentes asignados</span>
                  )}
                </div>
              </div>

              {/* Formato y Tamaños */}
              <div style={{ marginTop: '0.8rem' }}>
                <span style={styles.tagSecondary}>
                  🎞️ {kit.active_film_format_detail ? kit.active_film_format_detail.name : 'Formato N/A'}
                </span>
                {' '}
                <span style={styles.tagSecondary}>
                  📐 {kit.active_negative_size_detail ? kit.active_negative_size_detail.name : 'Tamaño N/A'}
                </span>
              </div>

              {/* Accesorios Incluidos */}
              <div style={styles.section}>
                <strong>Accesorios:</strong>
                <div style={styles.tagContainer}>
                  {kit.accessories_detail && kit.accessories_detail.length > 0 ? (
                    kit.accessories_detail.map((acc) => (
                      <span key={acc.id} style={styles.tagDark}>
                        {acc.brand} {acc.model}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: '#a0aec0' }}>Sin accesorios</span>
                  )}
                </div>
              </div>

              {kit.notes && (
                <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: '#4a5568' }}>
                  <em>{kit.notes}</em>
                </p>
              )}

              {/* Botones de Acción: Editar y Eliminar */}
              <div style={styles.cardActions}>
                <button style={styles.btnDelete} onClick={() => handleDelete(kit)}>
                  🗑️ Eliminar
                </button>
                <button style={styles.btnEdit} onClick={() => handleEdit(kit)}>
                  ✏️ Editar Kit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <KitFormModal
          kit={editingKit}
          bodies={bodies}
          lenses={lenses}
          accessories={accessories}
          filmFormats={filmFormats}
          negativeSizes={negativeSizes}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};


// =================================================================
// FORMULARIO MODAL
// =================================================================
const KitFormModal = ({
  kit,
  bodies,
  lenses,
  accessories,
  filmFormats,
  negativeSizes,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = React.useState({
    name: kit?.name || '',
    camera_body: kit?.camera_body_detail ? kit.camera_body_detail.id : (kit?.camera_body || ''),
    lenses: kit ? kit.lenses_detail?.map(l => l.id) || [] : [],
    active_film_format: kit?.active_film_format_detail ? kit.active_film_format_detail.id : (kit?.active_film_format || ''),
    active_negative_size: kit?.active_negative_size_detail ? kit.active_negative_size_detail.id : (kit?.active_negative_size || ''),
    accessories: kit ? kit.accessories_detail?.map(a => a.id) || [] : [],
    is_active_setup: kit?.is_active_setup ?? true,
    notes: kit?.notes || ''
  });

  const selectedBodyObj = React.useMemo(() => {
    if (!formData.camera_body) return null;
    return bodies.find(b => String(b.id) === String(formData.camera_body));
  }, [formData.camera_body, bodies]);

  const bodyMountId = React.useMemo(() => {
    if (!selectedBodyObj) return null;
    if (selectedBodyObj.lens_mount_detail) return selectedBodyObj.lens_mount_detail.id;
    if (selectedBodyObj.lens_mount) return selectedBodyObj.lens_mount;
    return null;
  }, [selectedBodyObj]);

  const filteredLenses = React.useMemo(() => {
    if (!bodyMountId) {
      return lenses;
    }

    return lenses.filter(lens => {
      const lensMountId = lens.lens_mount_detail 
        ? lens.lens_mount_detail.id 
        : lens.lens_mount;

      return String(lensMountId) === String(bodyMountId);
    });
  }, [bodyMountId, lenses]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLensesMultiSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData(prev => ({
      ...prev,
      lenses: selectedOptions
    }));
  };

  const handleAccessoriesMultiSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData(prev => ({
      ...prev,
      accessories: selectedOptions
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      camera_body: parseInt(formData.camera_body),
      active_film_format: formData.active_film_format ? parseInt(formData.active_film_format) : null,
      active_negative_size: formData.active_negative_size ? parseInt(formData.active_negative_size) : null,
    };
    onSave(payload);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{kit ? 'Editar Configuración / Kit' : 'Ensamblar Nuevo Kit'}</h2>
        <form onSubmit={handleSubmit}>

          <div style={styles.formGroup}>
            <label>Nombre del Kit / Configuración (*):</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Kiev 6c Daily Use"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Cuerpo de Cámara (*):</label>
            <select
              name="camera_body"
              value={formData.camera_body}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">
                {bodies.length === 0 ? '-- No hay cuerpos registrados --' : '-- Seleccionar Cuerpo --'}
              </option>
              {bodies.map(b => (
                <option key={b.id} value={b.id}>
                  {b.brand} {b.model} {b.lens_mount_detail ? `(${b.lens_mount_detail.name})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={{ marginBottom: '0.4rem', display: 'block' }}>
              Lentes Compatibles (Ctrl/Cmd para seleccionar varios):
              {selectedBodyObj && (
                <span style={{ fontSize: '0.8rem', color: '#2b6cb0', display: 'block', fontWeight: 'normal', marginTop: '0.2rem' }}>
                  {bodyMountId ? (
                    <>Filtrando por montura: <strong>{selectedBodyObj.lens_mount_detail?.name || 'ID ' + bodyMountId}</strong></>
                  ) : (
                    <span style={{ color: '#e53e3e' }}>⚠️ Este cuerpo no tiene montura asignada. Mostrando todos los lentes.</span>
                  )}
                </span>
              )}
            </label>
            <select
              multiple
              value={formData.lenses}
              onChange={handleLensesMultiSelect}
              style={{ ...styles.input, height: '110px' }}
            >
              {filteredLenses.length === 0 ? (
                <option disabled>No hay lentes con montura compatible registrados</option>
              ) : (
                filteredLenses.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.brand} {l.focal_length} {l.max_aperture || ''} {l.model}
                  </option>
                ))
              )}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Formato de Película Activo:</label>
            <select
              name="active_film_format"
              value={formData.active_film_format}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">-- Seleccionar Formato --</option>
              {filmFormats.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Tamaño de Negativo Activo:</label>
            <select
              name="active_negative_size"
              value={formData.active_negative_size}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">-- Seleccionar Tamaño --</option>
              {negativeSizes.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {accessories.length > 0 && (
            <div style={styles.formGroup}>
              <label>Accesorios Incluidos (Ctrl/Cmd para seleccionar varios):</label>
              <select
                multiple
                value={formData.accessories}
                onChange={handleAccessoriesMultiSelect}
                style={{ ...styles.input, height: '90px' }}
              >
                {accessories.map(a => (
                  <option key={a.id} value={a.id}>
                    [{a.brand}] {a.model} ({a.accessory_type})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="is_active_setup"
                checked={formData.is_active_setup}
                onChange={handleChange}
              />
              {' '}¿Configuración armada y lista para disparar?
            </label>
          </div>

          <div style={styles.formGroup}>
            <label>Notas de la Configuración:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              style={styles.input}
            />
          </div>

          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.btnSecondary}>
              Cancelar
            </button>
            <button type="submit" style={styles.btnPrimary}>
              Guardar Kit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto' },
  headerBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { color: '#2c3e50', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' },
  card: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  badgeActive: { backgroundColor: '#c6f6d5', color: '#22543d', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' },
  badgeInactive: { backgroundColor: '#fed7d7', color: '#9b2c2c', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' },
  kitDetailBox: { backgroundColor: '#f7fafc', padding: '0.8rem', borderRadius: '6px', borderLeft: '4px solid #3182ce', margin: '0.5rem 0' },
  section: { marginTop: '1rem' },
  tagContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.3rem' },
  tagPrimary: { backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' },
  tagSecondary: { backgroundColor: '#f0fff4', color: '#276749', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' },
  tagDark: { backgroundColor: '#edf2f7', color: '#2d3748', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.80rem' },
  center: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem' },
  error: { color: '#e53e3e', textAlign: 'center', padding: '3rem' },
  
  // Botones
  btnPrimary: { backgroundColor: '#2b6cb0', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnSecondary: { backgroundColor: '#e2e8f0', color: '#4a5568', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' },
  cardActions: { display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' },
  btnEdit: { backgroundColor: '#edf2f7', border: '1px solid #cbd5e0', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },
  btnDelete: { backgroundColor: '#fff5f5', color: '#e53e3e', border: '1px solid #feb2b2', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },

  // Modal
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' },
  formGroup: { marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  checkboxGroup: { marginBottom: '1.2rem' },
  input: { padding: '0.6rem', borderRadius: '4px', border: '1px solid #cbd5e0', fontSize: '0.9rem', width: '100%', boxSizing: 'border-box' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }
};

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(<KitApp />);