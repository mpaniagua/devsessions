// static/js/CameraList.jsx

const CameraApp = () => {
  const [cameras, setCameras] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.setError ? React.useSetState : React.useState(null);

  // Catálogos auxiliares para los checkboxes/selects
  const [availableFormats, setAvailableFormats] = React.useState([]);
  const [availableSizes, setAvailableSizes] = React.useState([]);

  // Estado para controlar el modal y la cámara a editar
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCamera, setEditingCamera] = React.useState(null);

  const API_CAMERAS = '/api/v1/camerabody/';
  const API_FORMATS = '/api/v1/film-formats/';    // Asegúrate de tener estos endpoints o ajústalos
  const API_SIZES = '/api/v1/negative-sizes/';


// Función para obtener una cookie por su nombre (ej. csrftoken)
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

  // 1. Cargar datos iniciales
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [resCameras, resFormats, resSizes] = await Promise.all([
        fetch(API_CAMERAS),
        fetch(API_FORMATS).catch(() => null), // Si aún no los expones en la API, no romperá la app
        fetch(API_SIZES).catch(() => null)
      ]);

      if (!resCameras.ok) throw new Error(`Error HTTP: ${resCameras.status}`);
      
      const dataCameras = await resCameras.json();
      setCameras(dataCameras);

      if (resFormats && resFormats.ok) setAvailableFormats(await resFormats.json());
      if (resSizes && resSizes.ok) setAvailableSizes(await resSizes.json());

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAllData();
  }, []);

  // Abrir modal para crear nueva cámara
  const handleCreateNew = () => {
    setEditingCamera(null); // Sin datos predeterminados
    setIsModalOpen(true);
  };

  // Abrir modal para editar cámara existente
  const handleEdit = (camera) => {
    setEditingCamera(camera);
    setIsModalOpen(true);
  };

  // Guardar datos (Crear o Actualizar)
  const handleSave = async (formData) => {
    try {
      const isEdit = Boolean(editingCamera);
      const url = isEdit ? `${API_CAMERAS}${editingCamera.id}/` : API_CAMERAS;
      const method = isEdit ? 'PUT' : 'POST';

      const csrftoken = getCookie('csrftoken'); // Obtener token CSRF

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken, // Enviar token en los headers
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

  if (loading) return <div style={styles.center}>Cargando información...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerBar}>
        <h1 style={styles.title}>Catálogo de Cámaras Analógicas</h1>
        <button style={styles.btnPrimary} onClick={handleCreateNew}>
          + Agregar Nueva Cámara
        </button>
      </div>

      {cameras.length === 0 ? (
        <p>No hay cámaras registradas.</p>
      ) : (
        <div style={styles.grid}>
          {cameras.map((camera) => (
            <div key={camera.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h2>{camera.brand} {camera.model}</h2>
                <span style={styles.badge}>{camera.camera_type}</span>
              </div>

              <p><strong>Mecanismo:</strong> {camera.mechanism_type}</p>
              <p><strong>Año:</strong> {camera.release_year || 'N/A'}</p>

              <div style={styles.section}>
                <strong>Formatos de Película:</strong>
                <div style={styles.tagContainer}>
                  {camera.film_formats_detail?.map((f) => (
                    <span key={f.id} style={styles.tagPrimary}>{f.name}</span>
                  ))}
                </div>
              </div>

              <div style={styles.section}>
                <strong>Tamaños de Negativo:</strong>
                <div style={styles.tagContainer}>
                  {camera.negative_sizes_detail?.map((s) => (
                    <span key={s.id} style={styles.tagSecondary}>{s.name}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button style={styles.btnEdit} onClick={() => handleEdit(camera)}>
                  ✏️ Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DE EDICIÓN / CREACIÓN */}
      {isModalOpen && (
        <CameraFormModal
          camera={editingCamera}
          availableFormats={availableFormats}
          availableSizes={availableSizes}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};


// =================================================================
// COMPONENTE FORMULARIO / MODAL
// =================================================================
const CameraFormModal = ({ camera, availableFormats, availableSizes, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    brand: camera?.brand || '',
    model: camera?.model || '',
    camera_type: camera?.camera_type || 'SLR',
    mechanism_type: camera?.mechanism_type || 'MECHANICAL',
    has_light_meter: camera?.has_light_meter || false,
    has_interchangeable_lens: camera?.has_interchangeable_lens ?? true,
    lens_mount: camera?.lens_mount || '',
    release_year: camera?.release_year || '',
    // En el GET recibimos 'film_formats_detail', pero para enviar PUT/POST enviamos un arreglo de IDs
    film_formats: camera ? camera.film_formats_detail?.map(f => f.id) || [] : [],
    negative_sizes: camera ? camera.negative_sizes_detail?.map(s => s.id) || [] : [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (e, fieldName) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData(prev => ({
      ...prev,
      [fieldName]: selectedOptions
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{camera ? 'Editar Cámara' : 'Nueva Cámara'}</h2>
        <form onSubmit={handleSubmit}>
          
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
            <label>Modelo:</label>
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
            <label>Tipo de Cámara:</label>
            <select
              name="camera_type"
              value={formData.camera_type}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="SLR">SLR</option>
              <option value="RANGEFINDER">Rangefinder</option>
              <option value="TLR">TLR</option>
              <option value="POINT_AND_SHOOT">Point & Shoot</option>
              <option value="MEDIUM_FORMAT_SYSTEM">Medio Formato</option>
              <option value="LARGE_FORMAT_VIEW">Gran Formato</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Mecanismo:</label>
            <select
              name="mechanism_type"
              value={formData.mechanism_type}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="MECHANICAL">Mecánica</option>
              <option value="ELECTRONIC">Electrónica</option>
              <option value="HYBRID">Híbrida</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Año de Lanzamiento:</label>
            <input
              type="number"
              name="release_year"
              value={formData.release_year}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Formatos de Película (Multiselect) */}
          {availableFormats.length > 0 && (
            <div style={styles.formGroup}>
              <label>Formatos de Película (Mantén Presionado Ctrl/Cmd para seleccionar varios):</label>
              <select
                multiple
                value={formData.film_formats}
                onChange={(e) => handleMultiSelect(e, 'film_formats')}
                style={{ ...styles.input, height: '80px' }}
              >
                {availableFormats.map(fmt => (
                  <option key={fmt.id} value={fmt.id}>{fmt.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Tamaños de Negativo (Multiselect) */}
          {availableSizes.length > 0 && (
            <div style={styles.formGroup}>
              <label>Tamaños de Negativo (Mantén Presionado Ctrl/Cmd para seleccionar varios):</label>
              <select
                multiple
                value={formData.negative_sizes}
                onChange={(e) => handleMultiSelect(e, 'negative_sizes')}
                style={{ ...styles.input, height: '80px' }}
              >
                {availableSizes.map(sz => (
                  <option key={sz.id} value={sz.id}>{sz.name}</option>
                ))}
              </select>
            </div>
          )}

          <div style={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="has_light_meter"
                checked={formData.has_light_meter}
                onChange={handleChange}
              />
              {' '}¿Tiene exposímetro?
            </label>
          </div>

          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.btnSecondary}>
              Cancelar
            </button>
            <button type="submit" style={styles.btnPrimary}>
              Guardar Cambios
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};


// Estilos integrados para el Modal y Formularios
const styles = {
  container: { padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto' },
  headerBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { color: '#2c3e50', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  card: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  badge: { backgroundColor: '#edf2f7', color: '#4a5568', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' },
  section: { marginTop: '1rem' },
  tagContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' },
  tagPrimary: { backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' },
  tagSecondary: { backgroundColor: '#f0fff4', color: '#276749', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' },
  center: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem' },
  error: { color: '#e53e3e', textAlign: 'center', padding: '3rem' },
  
  // Botones
  btnPrimary: { backgroundColor: '#3182ce', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnSecondary: { backgroundColor: '#e2e8f0', color: '#4a5568', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' },
  btnEdit: { backgroundColor: '#edf2f7', border: '1px solid #cbd5e0', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },

  // Modal
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' },
  formGroup: { marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  checkboxGroup: { marginBottom: '1rem' },
  input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e0', fontSize: '0.9rem' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }
};

// Renderizar la app en el DOM
const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(<CameraApp />);