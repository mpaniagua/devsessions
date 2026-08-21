// static/js/LensList.jsx

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

const LensApp = () => {
  const [lenses, setLenses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Catálogos
  const [availableMounts, setAvailableMounts] = React.useState([]);
  const [availableTypes, setAvailableTypes] = React.useState([]);

  // Estados de Modal y Edición
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingLens, setEditingLens] = React.useState(null);

  const API_LENSES = '/api/v1/lenses/';
  const API_MOUNTS = '/api/v1/lens-mounts/';
  const API_TYPES = '/api/v1/lens-types/';

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [resLenses, resMounts, resTypes] = await Promise.all([
        fetch(API_LENSES),
        fetch(API_MOUNTS).catch(() => null),
        fetch(API_TYPES).catch(() => null)
      ]);

      if (!resLenses.ok) throw new Error(`Error HTTP: ${resLenses.status}`);
      
      setLenses(await resLenses.json());
      if (resMounts && resMounts.ok) setAvailableMounts(await resMounts.json());
      if (resTypes && resTypes.ok) setAvailableTypes(await resTypes.json());

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
    setEditingLens(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lens) => {
    setEditingLens(lens);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      const isEdit = Boolean(editingLens);
      const url = isEdit ? `${API_LENSES}${editingLens.id}/` : API_LENSES;
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

  if (loading) return <div style={styles.center}>Cargando catálogo de lentes...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Catálogo de Lentes y Objetivos</h1>
        <button style={styles.btnPrimary} onClick={handleCreateNew}>
          + Agregar Nuevo Lente
        </button>
      </div>

      {lenses.length === 0 ? (
        <p>No hay lentes registrados.</p>
      ) : (
        <div style={styles.grid}>
          {lenses.map((lens) => (
            <div key={lens.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h2>{lens.brand}{lens.focal_length} {lens.model}</h2>
                <span style={styles.badge}>
                  {lens.lens_mount_detail ? lens.lens_mount_detail.name : 'Sin montura'}
                </span>
              </div>

              <p><strong>Nº de Serie:</strong> {lens.serial_number || 'N/A'}</p>
              <p><strong>Rosca de Filtro:</strong> {lens.filter_thread_size || 'N/A'}</p>
              <p><strong>Parasol Incluido:</strong> {lens.has_included_hood ? 'Sí' : 'No'}</p>

              <div style={styles.section}>
                <strong>Tipos / Clasificaciones:</strong>
                <div style={styles.tagContainer}>
                  {lens.lens_types_detail && lens.lens_types_detail.length > 0 ? (
                    lens.lens_types_detail.map((t) => (
                      <span key={t.id} style={styles.tagPrimary}>{t.name}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: '#a0aec0' }}>Ninguno asignado</span>
                  )}
                </div>
              </div>

              {lens.notes && (
                <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: '#4a5568' }}>
                  <em>{lens.notes}</em>
                </p>
              )}

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button style={styles.btnEdit} onClick={() => handleEdit(lens)}>
                  ✏️ Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <LensFormModal
          lens={editingLens}
          availableMounts={availableMounts}
          availableTypes={availableTypes}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};


// =================================================================
// FORMULARIO MODAL DE LENTES
// =================================================================
const LensFormModal = ({ lens, availableMounts, availableTypes, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
  brand: lens?.brand || '',
  model: lens?.model || '',
  focal_length: lens?.focal_length || '',
  max_aperture: lens?.max_aperture || '',
  serial_number: lens?.serial_number || '',
  lens_mount: lens?.lens_mount_detail ? lens.lens_mount_detail.id : (lens?.lens_mount || ''),
  lens_types: lens ? lens.lens_types_detail?.map(t => t.id) || [] : [],
  filter_thread_size: lens?.filter_thread_size || '',
  has_included_hood: lens?.has_included_hood || false,
  notes: lens?.notes || ''
});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData(prev => ({
      ...prev,
      lens_types: selectedOptions
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertir montura vacía a null para DRF
    const payload = {
      ...formData,
      lens_mount: formData.lens_mount ? parseInt(formData.lens_mount) : null
    };
    onSave(payload);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{lens ? 'Editar Lente' : 'Nuevo Lente'}</h2>
        <form onSubmit={handleSubmit}>
        
          <div style={styles.formGroup}>
            <label>Distancia Focal (*):</label>
            <input
              type="text"
              name="focal_length"
              value={formData.focal_length}
              onChange={handleChange}
              placeholder="Ej. 50mm, 168mm, 75mm, 70-210mm"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Apertura Máxima:</label>
            <input
              type="text"
              name="max_aperture"
              value={formData.max_aperture}
              onChange={handleChange}
              placeholder="Ej. f/2.8, f/5.6, f/6.8"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Marca:</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Nombre / Modelo:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Número de Serie:</label>
            <input
              type="text"
              name="serial_number"
              value={formData.serial_number}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Montura:</label>
            <select
              name="lens_mount"
              value={formData.lens_mount}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">-- Seleccionar Montura --</option>
              {availableMounts.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Rosca de Filtro:</label>
            <input
              type="text"
              name="filter_thread_size"
              value={formData.filter_thread_size}
              onChange={handleChange}
              placeholder="Ej. 52mm, Series VI, Copal #0"
              style={styles.input}
            />
          </div>

          {availableTypes.length > 0 && (
            <div style={styles.formGroup}>
              <label>Tipos / Clasificaciones (Manten presionado Ctrl/Cmd para varios):</label>
              <select
                multiple
                value={formData.lens_types}
                onChange={handleMultiSelect}
                style={{ ...styles.input, height: '90px' }}
              >
                {availableTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}

          <div style={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="has_included_hood"
                checked={formData.has_included_hood}
                onChange={handleChange}
              />
              {' '}¿Parasol incluido?
            </label>
          </div>

          <div style={styles.formGroup}>
            <label>Notas:</label>
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
              Guardar
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
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  card: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  badge: { backgroundColor: '#e2e8f0', color: '#2d3748', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' },
  section: { marginTop: '1rem' },
  tagContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' },
  tagPrimary: { backgroundColor: '#feebc8', color: '#7b341e', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' },
  center: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem' },
  error: { color: '#e53e3e', textAlign: 'center', padding: '3rem' },
  btnPrimary: { backgroundColor: '#2b6cb0', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnSecondary: { backgroundColor: '#e2e8f0', color: '#4a5568', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' },
  btnEdit: { backgroundColor: '#edf2f7', border: '1px solid #cbd5e0', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' },
  formGroup: { marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  checkboxGroup: { marginBottom: '1rem' },
  input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e0', fontSize: '0.9rem' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }
};

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(<LensApp />);