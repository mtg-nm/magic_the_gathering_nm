import { getByeTournamentInfoSection, getByeEvemt, getNavigation } from '@/lib/contentful';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function ByeTournamentPage() {
  try {
    const navigation = await getNavigation();
    const byeTournamentInfoSection = await getByeTournamentInfoSection();
    const byeEvemts = await getByeEvemt();

    const normalizedSlug = 'bye-turneringer';

    console.log('byeTournamentInfoSection:', byeTournamentInfoSection);
    console.log('byeEvemts:', byeEvemts);

    // Sorter events etter dato
    const sortedByeEvemts = Array.isArray(byeEvemts)
      ? [...byeEvemts].sort((a, b) => {
          const dateA = new Date(a.fields?.eventStartTime || 0).getTime();
          const dateB = new Date(b.fields?.eventStartTime || 0).getTime();
          return dateA - dateB;
        })
      : [];

    return (
      <>
        <Header navigation={navigation} normalizedSlug={normalizedSlug} />

        <main className="main-content">
          {/* BYE TOURNAMENT INFO SECTION - Øverst */}
          {byeTournamentInfoSection && (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>
                    {String(byeTournamentInfoSection.fields?.title || 'Bye-turneringer')}
                  </h2>
                  {byeTournamentInfoSection.fields?.subtitle && (
                    <p>{String(byeTournamentInfoSection.fields.subtitle)}</p>
                  )}
                </div>

                {byeTournamentInfoSection.fields?.description && (
                  <div className="content-box-blue" style={{ marginBottom: '40px' }}>
                    <p style={{
                      margin: '0',
                      color: 'var(--text-muted)',
                      fontSize: '1.05em',
                      lineHeight: '1.8'
                    }}>
                      {String(byeTournamentInfoSection.fields.description)}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* BYE EVENTS - Sortert etter dato */}
          {Array.isArray(byeEvemts) && byeEvemts.length > 0 ? (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>📅 Kommende Bye-Turneringer</h2>
                </div>

                <div className="grid-2">
                  {sortedByeEvemts.map((event: any) => {
                    const eventName = event.fields?.eventName ? String(event.fields.eventName) : 'Unavngitt turnering';
                    const eventDescription = event.fields?.eventDescription && typeof event.fields.eventDescription === 'string' 
                      ? event.fields.eventDescription 
                      : null;
                    const eventStartTime = event.fields?.eventStartTime ? String(event.fields.eventStartTime) : null;
                    const eventLocation = event.fields?.eventLocation ? String(event.fields.eventLocation) : null;
                    const format = event.fields?.format ? String(event.fields.format) : null;
                    const registrationUrl = event.fields?.registrationUrl ? String(event.fields.registrationUrl) : null;

                    return (
                      <div 
                        key={event.sys.id} 
                        className="card"
                      >
                        <h3 className="card-title">
                          {eventName}
                        </h3>

                        {eventDescription && (
                          <p className="card-description">
                            {eventDescription}
                          </p>
                        )}

                        <div className="event-specs">
                          {eventStartTime && (
                            <div className="spec">
                              <div className="spec-label">Dato & Tid</div>
                              <div className="spec-value">
                                {new Date(eventStartTime).toLocaleDateString('no-NO', {
                                  weekday: 'short',
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                            </div>
                          )}
                          {eventLocation && (
                            <div className="spec">
                              <div className="spec-label">Lokasjon</div>
                              <div className="spec-value">{eventLocation}</div>
                            </div>
                          )}
                          {format && (
                            <div className="spec">
                              <div className="spec-label">Format</div>
                              <div className="spec-value">{format}</div>
                            </div>
                          )}
                        </div>

                        {registrationUrl && (
                          <a 
                            href={registrationUrl} 
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
                  <p>❌ Ingen bye-turneringer funnet.</p>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading bye-turneringer page:', error);

    return (
      <>
        <Header navigation={[]} normalizedSlug="bye-turneringer" />
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