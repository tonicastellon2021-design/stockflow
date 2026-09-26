import { formatPrecio } from "../../../utils/precios";

function DashboardCorporativo() {
  const corporacion = [
    {
      id: "DEP-01",
      nombre: "Desarrollo Software",
      proyectos: [
        {
          id: "PRJ-101",
          nombre: "Sistema de Billing Cloud",
          tareas: [
            {
              codigo: "TAR-01",
              descripcion: "API REST Core",
              horasEstimadas: 40,
              costoHora: 35,
              completada: false,
              historial: [
                { fecha: "2026-09-01", horas: 20 },
                { fecha: "2026-09-05", horas: 25 },
              ],
            },
            {
              codigo: "TAR-02",
              descripcion: "Módulo Autenticación OAuth2",
              horasEstimadas: 20,
              costoHora: 40,
              completada: true,
              historial: [{ fecha: "2026-09-02", horas: 20 }],
            },
            {
              codigo: "TAR-03",
              descripcion: "Integración Pasarela Pagos",
              horasEstimadas: 30,
              costoHora: 50,
              completada: false,
              historial: [{ fecha: "2026-09-03", horas: 10 }],
            },
          ],
        },
        {
          id: "PRJ-102",
          nombre: "App Móvil Clientes",
          tareas: [
            {
              codigo: "TAR-04",
              descripcion: "Diseño UI/UX Pantallas",
              horasEstimadas: 15,
              costoHora: 25,
              completada: true,
              historial: [{ fecha: "2026-09-04", horas: 15 }],
            },
            {
              codigo: "TAR-05",
              descripcion: "Notificaciones Push Firebase",
              horasEstimadas: 25,
              costoHora: 30,
              completada: false,
              historial: [
                { fecha: "2026-09-05", horas: 15 },
                { fecha: "2026-09-06", horas: 15 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "DEP-02",
      nombre: "Infraestructura & DevOps",
      proyectos: [
        {
          id: "PRJ-201",
          nombre: "Migración Kubernetes",
          tareas: [
            {
              codigo: "TAR-06",
              descripcion: "Configuración Cluster EKS",
              horasEstimadas: 50,
              costoHora: 60,
              completada: false,
              historial: [
                { fecha: "2026-09-01", horas: 30 },
                { fecha: "2026-09-02", horas: 18 },
              ],
            },
            {
              codigo: "TAR-07",
              descripcion: "Pipelines CI/CD GitLab",
              horasEstimadas: 30,
              costoHora: 45,
              completada: true,
              historial: [{ fecha: "2026-09-03", horas: 30 }],
            },
          ],
        },
        {
          id: "PRJ-202",
          nombre: "Hardening de Seguridad",
          tareas: [
            {
              codigo: "TAR-08",
              descripcion: "Auditoría de Vulnerabilidades",
              horasEstimadas: 10,
              costoHora: 55,
              completada: true,
              historial: [{ fecha: "2026-09-01", horas: 10 }],
            },
            {
              codigo: "TAR-09",
              descripcion: "Cifrado de Bases de Datos",
              horasEstimadas: 18,
              costoHora: 50,
              completada: false,
              historial: [],
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <h2>DASHBOARD DE CONTROL CORPORATIVO</h2>
      {corporacion.map((corpo) => {
        const depaControl = corpo.proyectos.every((proyecto) =>
          proyecto.tareas.every((tarea) => {
            const horasInvertidasTarea = tarea.historial.reduce(
              (acc, item) => acc + item.horas,
              0,
            );
            return horasInvertidasTarea <= tarea.horasEstimadas;
          }),
        );

        const cantidadProyectos = corpo.proyectos.length;

        const cantidadTareas = corpo.proyectos.reduce(
          (acc, proyecto) => acc + proyecto.tareas.length,
          0,
        );

        const arregloTareas = corpo.proyectos.flatMap((p) => p.tareas);

        const sobrecosto = arregloTareas.filter(
          (t) =>
            t.horasEstimadas <
            t.historial.reduce((acc, item) => acc + item.horas, 0),
        ).length;

        const inversion = corpo.proyectos.reduce(
          (acc, proyect) =>
            acc +
            proyect.tareas.reduce(
              (acc, tarea) =>
                acc +
                tarea.historial.reduce(
                  (acc, historial) => acc + historial.horas,
                  0,
                ) *
                  tarea.costoHora,
              0,
            ),
          0,
        );

        return (
          <div
            key={corpo.id}
            className="card border border-light-subtle bg-white shadow-sm mb-4"
          >
            <div className="card-header bg-white border-bottom border-light-subtle d-flex justify-content-between align-items-center pt-3 px-4">
              <h3 className="h4 text-dark mb-0 fw-bold">{corpo.nombre}</h3>
              <span
                className={`fs-6 fw-semibold ${depaControl ? "text-success" : "text-danger"}`}
              >
                Departamento en control: {depaControl ? "SÍ" : "NO"}
              </span>
            </div>

            <div className="card-body px-4 py-3">
              <div className="d-flex flex-column gap-3">
                {corpo.proyectos.map((proyecto) => {
                  const riesgoSobreCostoPro = proyecto.tareas.some(
                    (t) =>
                      t.horasEstimadas <
                      t.historial.reduce((acc, h) => acc + h.horas, 0),
                  );
                  const totalTareasPro = proyecto.tareas.length;

                  const totalTareasCompletadasPro = proyecto.tareas.filter(
                    (t) => t.completada === true,
                  ).length;

                  const totalTareasPendientesPro = proyecto.tareas.filter(
                    (t) => t.completada === false,
                  );

                  const totalInvertidoPro = proyecto.tareas.reduce(
                    (acc, tarea) =>
                      acc +
                      tarea.historial.reduce(
                        (acc, historial) => acc + historial.horas,
                        0,
                      ) *
                        tarea.costoHora,
                    0,
                  );

                  const numeroAvance =
                    totalTareasPro > 0
                      ? (totalTareasCompletadasPro / totalTareasPro) * 100
                      : 0;
                  const avance = numeroAvance.toFixed(1);

                  const tamanio =
                    totalTareasPendientesPro.length > 0
                      ? Math.floor(12 / totalTareasPendientesPro.length)
                      : 12;

                  return (
                    <div
                      key={proyecto.id}
                      className={`card p-3 bg-body-secondary bg-opacity-50 rounded-3 border-start border-4 ${riesgoSobreCostoPro ? "border-danger" : "border-success"}`}
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        borderBottom: "none",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h4
                            className="text-muted mb-1 text-uppercase fw-bold"
                            style={{
                              fontSize: "0.7rem",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Proyecto
                          </h4>
                          <span className="fs-5 fw-semibold text-dark-emphasis">
                            {proyecto.nombre}
                          </span>
                        </div>

                        <div className="text-end">
                          <span
                            className={`badge ${riesgoSobreCostoPro ? "bg-danger-subtle text-danger" : "bg-success-subtle text-success"} px-3 py-2 rounded-pill fw-semibold`}
                          >
                            {riesgoSobreCostoPro
                              ? "Riesgo de sobrecosto"
                              : "Al día"}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="d-flex align-items-center flex-wrap gap-3">
                          <span className="badge text-dark">
                            {totalTareasPro}{" "}
                            {totalTareasPro === 1 ? "Tarea" : "Tareas"}
                          </span>
                          <span className="badge text-dark">
                            {totalTareasCompletadasPro}{" "}
                            {totalTareasCompletadasPro === 1
                              ? "Completada"
                              : "Completadas"}
                          </span>
                          <span className="badge text-dark">
                            {totalTareasPendientesPro.length}{" "}
                            {totalTareasPendientesPro.length === 1
                              ? "Pendiente"
                              : "Pendientes"}
                          </span>
                          <span>
                            Inversión:{" "}
                            <span className="text-success">
                              {formatPrecio(totalInvertidoPro)}
                            </span>
                          </span>

                          <span>
                            <span className="text-success">
                              {avance}% avanzado
                            </span>
                          </span>
                        </div>
                        <div className="row">
                          {totalTareasPendientesPro.length === 0 ? (
                            <div className="alert alert-primary" role="alert">
                              ¡Proyecto al 100%!
                            </div>
                          ) : (
                            totalTareasPendientesPro.map((tarea) => {
                              const horasEstimadasTa = tarea.horasEstimadas;
                              const horasInvertidasTa = tarea.historial.reduce(
                                (acc, item) => acc + item.horas,
                                0,
                              );
                              const costoActualTa =
                                horasInvertidasTa * tarea.costoHora;

                              const functionFacto = () => {
                                if (horasInvertidasTa > horasEstimadasTa) {
                                  return {
                                    clase: "bg-danger",
                                    texto: "Sobre costo",
                                  };
                                }
                                if (horasInvertidasTa < horasEstimadasTa) {
                                  return {
                                    clase: "bg-success",
                                    texto: "En tiempo",
                                  };
                                } else {
                                  return {
                                    clase: "bg-warning",
                                    texto: "En limite",
                                  };
                                }
                              };

                              const estadoVisual = functionFacto();

                              return (
                                <div
                                  key={tarea.codigo}
                                  className={`col-${tamanio}`}
                                >
                                  <div className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                      <h5>{tarea.descripcion}</h5>
                                      <p>Codigo: {tarea.codigo}</p>
                                    </div>
                                    <div className="card-body">
                                      <div className="d-flex align-items-center flex-wrap gap-3">
                                        <span className="badge text-dark">
                                          Horas estimadas: {horasEstimadasTa}
                                        </span>
                                        <span className="badge text-dark">
                                          Horas Invertidas: {horasInvertidasTa}
                                        </span>
                                      </div>
                                      <span className="badge text-dark">
                                        Costo Actual: {costoActualTa}
                                      </span>
                                      <span
                                        className={`badge text-white ${estadoVisual.clase}`}
                                      >
                                        {estadoVisual.texto}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-footer bg-white border-top border-light-subtle pt-3 pb-4 px-4">
              <h5
                className="text-muted text-uppercase fw-bold mb-3"
                style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}
              >
                Resumen del departamento
              </h5>
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 border border-light-subtle text-center">
                    <small className="text-muted d-block mb-1">Proyectos</small>
                    <span className="fw-bold text-dark fs-5">
                      {cantidadProyectos}
                    </span>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 border border-light-subtle text-center">
                    <small className="text-muted d-block mb-1">
                      Tareas Totales
                    </small>
                    <span className="fw-bold text-dark fs-5">
                      {cantidadTareas}
                    </span>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 border border-light-subtle text-center">
                    <small className="text-muted d-block mb-1">
                      Con Sobrecosto
                    </small>
                    <span
                      className={`fw-bold fs-5 ${sobrecosto > 0 ? "text-danger" : "text-muted"}`}
                    >
                      {sobrecosto}
                    </span>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 border border-light-subtle text-center">
                    <small className="text-muted d-block mb-1">
                      Inversión Total
                    </small>
                    <span className="fw-bold text-success fs-5">
                      {formatPrecio(inversion)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DashboardCorporativo;
