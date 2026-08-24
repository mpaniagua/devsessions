// static/js/AccessoryList.jsx

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

const AccessoryApp = () => {
  const [accessories, setAccessories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Catálogos para el modal
  const [filmFormats, setFilmFormats] = React.useState([]);
  const [negativeSizes, setNegativeSizes] = React.useState([]);

  // Modal y Edición
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingAccessory, setEditingAccessory] = React.useState(null);

  const API_ACCESSORIES = '/api/v1/accessories/';
  const API_FORMATS = '/api/v1/film-formats/';
  const API_SIZES = '/api/v1/negative-sizes/';

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [resAcc, resFormats, resSizes] = await Promise.all([
        fetch(API_ACCESSORIES),
        fetch(API_FORMATS).catch(() => null),
        fetch(API_SIZES).catch(() => null),
      ]);

      if (!resAcc.ok) throw new Error(`Error HTTP: ${resAcc.status}`);

      setAccessories(await resAcc.json());
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
    setEditingAccessory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (acc) => {
    setEditingAccessory(acc);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      const isEdit = Boolean(editingAccessory);
      const url = isEdit ? `${API_ACCESSORIES}${editingAccessory.id}/` : API_ACCESSORIES;
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

  if (loading) return <div style={styles.center}>Cargando accesorios...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Catálogo de Accesorios</h1>
        <button style={styles.btnPrimary} onClick={handleCreateNew}>
          + Agregar Nuevo Accesorio
        </button>
      </div>

      {accessories.length === 0 ? (
        <p>No hay accesorios registrados.</p>
      ) : (
        <div style={styles.grid}>
          {accessories.map((acc) => (
            <div key={acc.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h2>{acc.brand} {acc.model}</h2>
                <span style={styles.badge}>{acc.accessory_type}</span>
              </div>

              <p><strong>Nº de Serie:</strong> {acc.serial_number || 'N/A'}</p>

              {(acc.film_format_detail || acc.negative_size_detail) && (
                <div style={{ marginTop: '0.8rem' }}>
                  {acc.film_format_detail && (
                    <span style={styles.tagPrimary}>🎞️ {acc.film_format_detail.name}</span>
                  )}{' '}
                  {acc.negative_size_detail && (
                    <span style={styles.tagSecondary}>📐 {acc.negative_size_detail.name}</span>
                  )}
                </div>
              )}

              {acc.notes && (
                <p style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: '#4a5568' }}>
                  <em>{acc.notes}</em>
                </p>
              )}

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button style={styles.btnEdit} onClick={() => handleEdit(acc)}>
                  ✏️ Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <AccessoryFormModal
          accessory={editingAccessory}
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
// MODAL DE CREACIÓN / EDICIÓN DE ACCESORIOS
// =================================================================
const AccessoryFormModal = ({ accessory, filmFormats, negativeSizes, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    brand: accessory?.brand || '',
    model: accessory?.model || '',
    accessory_type: accessory?.accessory_type || 'OTHER',
    serial_number: accessory?.serial_number || '',
    film_format: accessory?.film_format_detail ? accessory.film_format_detail.id : (accessory?.film_format || ''),
    negative_size: accessory?.negative_size_detail ? accessory.negative_size_detail.id : (accessory?.negative_size || ''),
    notes: accessory?.notes || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      film_format: formData.film_format ? parseInt(formData.film_format) : null,
      negative_size: formData.negative_size ? parseInt(formData.negative_size) : null,
    };
    onSave(payload);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{accessory ? 'Editar Accesorio' : 'Nuevo Accesorio'}</h2>
        <form onSubmit={handleSubmit}>

          <div style={styles.formGroup}>
            <label>Marca (*):</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Ej. Hasselblad, Mamiya, Horseman"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Modelo / Nombre (*):</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Ej. Respaldo A12, Prisma PM45, Chasis 4x5"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Tipo de Accesorio:</label>
            <select
              name="accessory_type"
              value={formData.accessory_type}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="FILM_BACK">Respaldo / Magazine de Película</option>
              <option value="VIEWFINDER">Visor / Prisma / Cintura</option>
              <option value="DARK_SLIDE">Chasis / Dark Slide / Placa</option>
              <option value="LENS_BOARD">Tabla de Lente (Lens Board)</option>
              <option value="MOTOR_DRIVE">Motor / Winder</option>
              <option value="ADAPTER">Adaptador / Anillo</option>
              <option value="HOOD">Parasol / Compendio</option>
              <option value="OTHER">Otro Accesorio</option>
            </select>
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
            <label>Formato de Película (si aplica):</label>
            <select
              name="film_format"
              value={formData.film_format}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">-- Ninguno / No aplica --</option>
              {filmFormats.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Tamaño de Negativo (si aplica):</label>
            <select
              name="negative_size"
              value={formData.negative_size}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">-- Ninguno / No aplica --</option>
              {negativeSizes.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
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
              Guardar Accesorio
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
  tagPrimary: { backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' },
  tagSecondary: { backgroundColor: '#f0fff4', color: '#276749', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' },
  center: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem' },
  error: { color: '#e53e3e', textAlign: 'center', padding: '3rem' },
  btnPrimary: { backgroundColor: '#2b6cb0', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnSecondary: { backgroundColor: '#e2e8f0', color: '#4a5568', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' },
  btnEdit: { backgroundColor: '#edf2f7', border: '1px solid #cbd5e0', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' },
  formGroup: { marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e0', fontSize: '0.9rem' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }
};

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(<AccessoryApp />);