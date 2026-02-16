import { getPages, getNavigation, getEvents, getByeTournamentInfo } from '@/lib/contentful';
import { notFound } from 'next/navigation';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const pages = await getPages();
    const navigation = await getNavigation();
    const events = await getEvents();
    const byeTournamentInfo = await getByeTournamentInfo();

    const normalizedSlug = slug.toLowerCase().trim();

    const page = pages.find((p: any) => 
      p.fields?.slug?.toLowerCase().trim() === normalizedSlug
    ) as any;

    if (!page) {
      notFound();
    }

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

    return (
      <>
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div className="header-left">
                <div className="header-title">
                  <h1>NM Magic 2026</h1>
                  <p>Norgesmesterskapet i Magic: The Gathering</p>
                </div>
              </div>
              <nav className="nav-menu">
                {Array.isArray(navigation) &&
                  navigation.map((item: any) => {
                    const href = item.fields?.url || item.fields?.slug || '/';
                    const isActive = normalizedSlug === (item.fields?.slug?.toLowerCase().trim() || '');

                    return (
                      <a
                        key={item.sys.id}
                        href={href}
                        target={item.fields?.isExternal ? '_blank' : undefined}
                        className={isActive ? 'active' : ''}
                      >
                        {String(item.fields?.label || item.fields?.title || 'Link')}
                      </a>
                    );
                  })}
              </nav>
            </div>
          </div>
        </header>

        <main className="main-content">
          {page?.fields?.heroSection && normalizedSlug !== 'fullt-program' && normalizedSlug !== 'bye-turneringer' && (
            <section className="page-section">
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                  <h1 style={{ 
                    fontSize: '3em', 
                    fontWeight: '700', 
                    color: 'var(--text-light)', 
                    marginBottom: '20px', 
                    lineHeight: '1.1' 
                  }}>
                    {String(page?.fields?.heroSection?.fields?.title || page?.fields?.title)}
                  </h1>
                  {page?.fields?.heroSection?.fields?.subtitle && (
                    <p style={{ 
                      fontSize: '1.2em', 
                      color: 'var(--text-muted)', 
                      maxWidth: '700px', 
                      margin: '0 auto 40px' 
                    }}>
                      {String(page?.fields?.heroSection?.fields?.subtitle)}
                    </p>
                  )}
                  {(page?.fields?.heroSection?.fields?.primaryButtonText || page?.fields?.heroSection?.fields?.secondaryButtonText) && (
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {page?.fields?.heroSection?.fields?.primaryButtonText && (
                        <a 
                          href={page?.fields?.heroSection?.fields?.primaryButtonLink || '#'} 
                          className="btn btn-primary"
                        >
                          {String(page?.fields?.heroSection?.fields?.primaryButtonText)}
                        </a>
                      )}
                      {page?.fields?.heroSection?.fields?.secondaryButtonText && (
                        <a 
                          href={page?.fields?.heroSection?.fields?.secondaryButtonLink || '#'} 
                          className="btn btn-secondary"
                        >
                          {String(page?.fields?.heroSection?.fields?.secondaryButtonText)}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {page?.fields?.description && normalizedSlug !== 'fullt-program' && normalizedSlug !== 'bye-turneringer' && (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  fontSize: '1.1em', 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.8',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {String(page?.fields?.description)}
                </div>
              </div>
            </section>
          )}

          {page?.fields?.content && (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.8',
                  fontSize: '1.05em',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {String(page?.fields?.content)}
                </div>
              </div>
            </section>
          )}

          {(page?.fields?.rulesv2 || page?.fields?.deltakere) && normalizedSlug !== 'fullt-program' && normalizedSlug !== 'bye-turneringer' && (
            <section className="page-section">
              <div className="container">
                <div className="event-specs">
                  {page?.fields?.rulesv2 && (
                    <div className="spec">
                      <div className="spec-label">Regler</div>
                      <div className="spec-value">{String(page?.fields?.rulesv2)}</div>
                    </div>
                  )}
                  {page?.fields?.deltakere && (
                    <div className="spec">
                      <div className="spec-label">Deltakere</div>
                      <div className="spec-value">{String(page?.fields?.deltakere)}</div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {normalizedSlug === 'fullt-program' && Array.isArray(events) && events.length > 0 && (
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

                          return (
                            <div 
                              key={event.sys.id} 
                              className="card"
                            >
                              <h3 className="card-title">
                                {String(event.fields?.title || 'Unavngitt arrangement')}
                              </h3>

                              {event.fields?.description && typeof event.fields.description === 'string' && (
                                <p className="card-description">
                                  {event.fields.description}
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
                                {event.fields?.startTime && (
                                  <div className="spec">
                                    <div className="spec-label">Tid</div>
                                    <div className="spec-value">{String(event.fields.startTime)}</div>
                                  </div>
                                )}
                                {event.fields?.entryFee && (
                                  <div className="spec">
                                    <div className="spec-label">Pris</div>
                                    <div className="spec-value">{String(event.fields.entryFee)} kr</div>
                                  </div>
                                )}
                                {event.fields?.maxParticipants && (
                                  <div className="spec">
                                    <div className="spec-label">Max deltakere</div>
                                    <div className="spec-value">{String(event.fields.maxParticipants)}</div>
                                  </div>
                                )}
                                {deltakere && (
                                  <div className="spec">
                                    <div className="spec-label">Deltakere</div>
                                    <div className="spec-value">{deltakere}</div>
                                  </div>
                                )}
                                {event.fields?.format && (
                                  <div className="spec">
                                    <div className="spec-label">Format</div>
                                    <div className="spec-value">{String(event.fields.format)}</div>
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
          )}

          {normalizedSlug === 'bye-turneringer' && Array.isArray(byeTournamentInfo) && byeTournamentInfo.length > 0 && (
            <section className="page-section">
              <div className="container">
                <div className="section-header">
                  <h2>Bye-turneringer</h2>
                  <p>Siste sjanse til å vinne bye til Norgesmesterskapet</p>
                </div>

                <div className="grid-2">
                  {byeTournamentInfo.map((item: any) => {
                    const deltakere = item.fields?.deltakere ? String(item.fields.deltakere) : null;
                    const rulesv2 = item.fields?.rulesv2 ? String(item.fields.rulesv2) : null;

                    return (
                      <div key={item.sys.id} className="card">
                        <h3 className="card-title">
                          {String(item.fields?.title || 'Unavngitt turnering')}
                        </h3>
                        {item.fields?.description && (
                          <p className="card-description">
                            {String(item.fields.description)}
                          </p>
                        )}
                        <div className="event-specs">
                          {item.fields?.format && (
                            <div className="spec">
                              <div className="spec-label">Format</div>
                              <div className="spec-value">{String(item.fields.format)}</div>
                            </div>
                          )}
                          {item.fields?.rounds && (
                            <div className="spec">
                              <div className="spec-label">Runder</div>
                              <div className="spec-value">{String(item.fields.rounds)}</div>
                            </div>
                          )}
                          {deltakere && (
                            <div className="spec">
                              <div className="spec-label">Deltakere</div>
                              <div className="spec-value">{deltakere}</div>
                            </div>
                          )}
                          {rulesv2 && (
                            <div className="spec">
                              <div className="spec-label">Regler</div>
                              <div className="spec-value">{rulesv2}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {!page?.fields?.heroSection && 
            !page?.fields?.description && 
            !page?.fields?.content && 
            !page?.fields?.rulesv2 &&
            !page?.fields?.deltakere &&
            !(normalizedSlug === 'fullt-program' && Array.isArray(events) && events.length > 0) &&
            !(normalizedSlug === 'bye-turneringer' && Array.isArray(byeTournamentInfo) && byeTournamentInfo.length > 0) && (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  padding: '40px', 
                  backgroundColor: 'var(--box-primary)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <p>Denne siden har ikke noe innhold ennå.</p>
                </div>
              </div>
            </section>
          )}
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">NM Magic 2026</div>
              <div>Pilestredet 52 - Studenthuset, OsloMet • 7-9 august 2026</div>
            </div>
          </div>
        </footer>
      </>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    notFound();
  }
}