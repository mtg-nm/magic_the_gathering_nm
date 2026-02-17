import { getEvents, getNavigation } from '@/lib/contentful';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function FulltProgramPage() {
  try {
    const navigation = await getNavigation();
    const events = await getEvents();

    const groupEventsByDay = (eventList: any[]) => {
      const dayMap: { [key: string]: { name: string; date: string } } = {
        'day one': { name: 'Fredag', date: '7. august' },
        'day two': { name: 'Lørdag', date: '8. august' },
        'day three': { name: 'Søndag', date: '9. august' }
      };

      const grouped: { [key: string]: any[] } = {
        'Fredag': [],
        'Lørdag': [],
        'Søndag': []
      };

      eventList.forEach((event: any) => {
        const dayKey = event.fields?.day?.toLowerCase().trim() || '';
        const dayInfo = dayMap[dayKey];
        const dayName = dayInfo?.name || 'Annen';

        if (grouped[dayName]) {
          grouped[dayName].push(event);
        }
      });

      return grouped;
    };

    const eventsByDay = groupEventsByDay(events);

    const dayDates: { [key: string]: string } = {
      'Fredag': '7. august',
      'Lørdag': '8. august',
      'Søndag': '9. august'
    };

    const normalizedSlug = 'fullt-program';

    return (
      <>
        <Header navigation={navigation} normalizedSlug={normalizedSlug} />

        <main className="main-content">
          {Array.isArray(events) && events.length > 0 ? (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>Fullt Program</h2>
                  <p>Alt som skjer under Norgesmesterskapet</p>
                </div>

                {Object.entries(eventsByDay).map(([day, dayEvents]: [string, any[]]) => (
                  dayEvents.length > 0 && (
                    <div key={day} className="day-section">
                      <h3 className="day-title">🗓️ {day} {dayDates[day]}</h3>

                      <div className="grid-2">
                        {dayEvents.map((event: any) => {
                          const signupUrl = event.fields?.url ? String(event.fields.url) : null;
                          const schedule = event.fields?.schedule ? String(event.fields.schedule) : null;
                          const deltakere = event.fields?.deltakere ? String(event.fields.deltakere) : null;
                          const rulesv2 = event.fields?.rulesv2 ? String(event.fields.rulesv2) : null;
                          const startTime = event.fields?.startTime ? String(event.fields.startTime) : null;
                          const entryFee = event.fields?.entryFee ? String(event.fields.entryFee) : null;
                          const maxParticipants = event.fields?.maxParticipants ? String(event.fields.maxParticipants) : null;
                          const format = event.fields?.format ? String(event.fields.format) : null;
                          const title = event.fields?.title ? String(event.fields.title) : 'Unavngitt arrangement';
                          const description = event.fields?.description && typeof event.fields.description === 'string' ? event.fields.description : null;

                          return (
                            <div 
                              key={event.sys.id} 
                              className="card"
                            >
                              <h3 className="card-title">
                                {title}
                              </h3>

                              {description && (
                                <p className="card-description">
                                  {description}
                                </p>
                              )}

                              {schedule && (
                                <div className="event-schedule" style={{ 
                                  backgroundColor: 'rgba(123, 196, 240, 0.1)',
                                  padding: '12px',
                                  borderRadius: '6px',
                                  marginBottom: '15px',
                                  borderLeft: '3px solid #7bc4f0',
                                  color: 'var(--text-muted)',
                                  fontSize: '0.95em',
                                  lineHeight: '1.5'
                                }}>
                                  {schedule}
                                </div>
                              )}

                              <div className="event-specs">
                                {startTime && (
                                  <div className="spec">
                                    <div className="spec-label">Tid</div>
                                    <div className="spec-value">{startTime}</div>
                                  </div>
                                )}
                                {entryFee && (
                                  <div className="spec">
                                    <div className="spec-label">Pris</div>
                                    <div className="spec-value">{entryFee} kr</div>
                                  </div>
                                )}
                                {maxParticipants && (
                                  <div className="spec">
                                    <div className="spec-label">Max deltakere</div>
                                    <div className="spec-value">{maxParticipants}</div>
                                  </div>
                                )}
                                {deltakere && (
                                  <div className="spec">
                                    <div className="spec-label">Deltakere</div>
                                    <div className="spec-value">{deltakere}</div>
                                  </div>
                                )}
                                {format && (
                                  <div className="spec">
                                    <div className="spec-label">Format</div>
                                    <div className="spec-value">{format}</div>
                                  </div>
                                )}
                                {rulesv2 && (
                                  <div className="spec">
                                    <div className="spec-label">Regler</div>
                                    <div className="spec-value">{rulesv2}</div>
                                  </div>
                                )}
                              </div>

                              {signupUrl && (
                                <a 
                                  href={signupUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="btn btn-primary"
                                  style={{ width: '100%', textAlign: 'center', marginTop: '20px', display: 'block' }}
                                >
                                  Påmelding
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          ) : (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  padding: '40px', 
                  backgroundColor: 'var(--box-primary)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <p>Ingen arrangementer funnet.</p>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading fullt-program page:', error);
    
    return (
      <>
        <Header navigation={[]} normalizedSlug="fullt-program" />
        <main className="main-content">
          <section className="page-section">
            <div className="container">
              <div style={{ 
                padding: '40px', 
                backgroundColor: 'var(--box-primary)',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'var(--text-muted)'
              }}>
                <p>Det oppstod en feil ved lasting av siden. Vennligst prøv igjen senere.</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}