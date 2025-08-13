"use client"

export function Contact() {
    return (
        <section className="w-full text-color-white md:mb-6">
            <div className="container px-4 mx-auto pt-4">
                <div className="flex flex-col md:flex-row items-center">
                    {/*Info a la izq  md:flex-row dispositivos grandes horizontal */}
                    <div className="md:w-1/2 w-full flex flex-col items-start mt-6">
                        <div className="flex flex-row items-center md:gap-24 gap-6 w-full">
                                <h1>
                                    St Leon S. Street
                                    <br />Floor 1, Office 2
                                    <br />New York, NY 10001
                                </h1>
                            <iframe
                                className="ferrelect-map"
                                src="https://www.google.com/maps?q=New+York,+NY+10001&output=embed"
                                width="250"
                                height="140"
                                style={{ border: 0, borderRadius: "24px" }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Ficticia Ferrelect"
                            />
                            
                        </div>
                    </div>
                    {/*Info a la drcha*/}
                    <div className="md:w-1/2 flex flex-col items-end">
                        <div className="flex flex-row items-end icon-contact-group">
                            <a href="/" target="blank" rel="noopener noreferrer" className="icon-contact">
                                <img src="/whatsapp.png" alt="WhatsApp" width={48} height={48} />
                            </a>
                            <a href="/" target="blank" rel="noopener noreferrer" className="icon-contact">
                                <img src="/instagram.png" alt="Instagram" width={48} height={48}/>
                            </a>
                            <a href="/" target="blank" rel="noopener noreferrer" className="icon-contact">
                                <img src="/mail.png" alt="Mail" width={48} height={48}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Línea horizontal my-margen vertical*/}
            <hr className="hr-dashed mx-auto w-full my-5 md:my-12" />
        </section>
    )
}