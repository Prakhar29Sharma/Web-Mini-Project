/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Services () {
    let message = `The project is equally divided based on the functionalities and we get hands-on experience in all the project development tasks.`;
    return (
      <section class="section-white">
 
    <div class="container">
 
        <div class="row">
       
                    <div class="col-md-12 text-center">

                          <h2 class="section-title">OUR TEAM</h2>

                          <p class="section-subtitle">{message}</p>
                          
                    </div> 
             
            <div class="col-sm-6 col-md-4">

                  <div class="team-item">
                  
                      <img src="https://csi.dbit.in/assets/img/team/2023/Prakhar.webp" class="team-img2" alt="pic" />                   
                      <h3>Prakhar Sharma</h3>            
                      <div class="team-info"><p>Backend Developer</p></div>
                      
                  
                      <ul class="team-icon">
                      
                        <li><a href="https://www.linkedin.com/in/prakhar-sharma-6680151b5/" class="linkedin">
                            <i class="fa fa-linkedin"></i>
                        </a></li>

                        <li><a href="https://github.com/Prakhar29Sharma" class="github">
                            <i class="fa fa-github"></i>
                        </a></li>

                        <li><a href={`mailto:prakhar29sharma@gmail.com`} class="email">
                            <i class="fa fa-envelope-square"></i>
                        </a></li>
                                                   
                      </ul>
                      
                  
                </div>
            </div> 
              
            <div class="col-sm-6 col-md-4">

                  <div class="team-item">
                  
                      <img src="https://csi.dbit.in/assets/img/team/2022/dhaneshwaritendle.webp" class="team-img" alt="pic" />
                     
                      <h3>Dhaneshwari Tendle</h3>
                      
                      <div class="team-info"><p>Database and Frontend Developer</p></div>
                  
                      <ul class="team-icon">
                      
                          <li><a href="https://www.linkedin.com/in/dhaneshwari-tendle-868b0324a/" class="linkedin">
                            <i class="fa fa-linkedin"></i></a></li>
                          
                          <li><a href="https://github.com/dhaneshwaritendle" class="github">
                            <i class="fa fa-github"></i></a></li>

                        <li><a href={`mailto:321dhaneshwari0035@dbit.in`} class="email">
                            <i class="fa fa-envelope-square"></i></a></li> 

                      </ul>
                      
                  </div>

            </div> 
            <div class="col-sm-6 col-md-4">

                  <div class="team-item">
                  
                      <img src="https://csi.dbit.in/assets/img/team/2023/sraina.webp" class="team-img2" alt="pic" />
                     
                      <h3>Sraina Panchangam</h3>
                      
                      <div class="team-info"><p>UI Design and Resource Collection</p></div>

                  
                      <ul class="team-icon">
                      
                          <li><a href="https://www.linkedin.com/in/sraina-panchangam-9953b4271/" class="linkedin">
                            <i class="fa fa-linkedin"></i></a></li>
                          
                          <li><a href="https://github.com/PSraina" class="github">
                            <i class="fa fa-github"></i></a></li> 

                          <li><a href={`mailto:sraina.p@gmail.com`} class="email">
                            <i class="fa fa-envelope-square"></i></a></li> 

                      </ul>
                      
                  </div>

            </div> 
        
        </div> 
    
    </div> 

    </section>
    )
}

export default Services;