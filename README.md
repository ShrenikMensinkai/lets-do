# lets-do

    Instructions to run locally
        1.  Clone the repo
            Backend
            -   change dir to lets-do/server 
            -   npm install
            -   npm start (runs on http://localhost:3001/)
            Frontend
            -   change dir to lets-do/client
            -   npm install
            -   npm start (runs on http://localhost:3000/)
    
    Endpoints
        User
            1.  Create User API:
                    endpoint/url: http://localhost:3001/users/
                    method: POST
                    payload: {
                            "name":<Full Name>,
                            "email": <valid Email ID>
                        }
            
            2.  User Registration API:
                    end point/url: http://localhost:3001/users/registration
                    method: POST
                    payload: {
                            "invite_id":<valid invite Id>,
                            "password": <minimum 8 character>
                        }

            3.  User Login API:
                    end point/url: http://localhost:3001/users/login
                    method: POST
                    payload: {
                            "email":<valid Email ID>,
                            "password": <minimum 8 character>
                        }
        Items
            1.  Create Item API:
                    endpoint/url: http://localhost:3001/items/
                    headers:{
                        token:<valid JWT token>
                    }
                    method: POST
                    payload: {
                        "title":<minimum 3 character>
                        }

            2.  Get all Item API:
                    endpoint/url: http://localhost:3001/items/
                    headers:{
                        token:<valid JWT token>
                    }
                    method: GET

            3.  Get detail Item API:
                    endpoint/url: http://localhost:3001/items/:<valid Item_id>
                    headers:{
                        token:<valid JWT token>
                    }
                    method: GET        
            
            4.  Update Item API:
                    endpoint/url: http://localhost:3001/items/:<valid Item_id>
                    headers:{
                        token:<valid JWT token>
                    }
                    method: PATCH 
                    payload:{
                        "is_done": <Boolean value>,
                        "title": <minimum 3 character>
                    }

            5.  Delete Item API:
                    endpoint/url: http://localhost:3001/items/:<valid Item_id>
                    headers:{
                        token:<valid JWT token>
                    }
                    method: DELETE        
        
    
    Loom video links
        demo1 - https://www.loom.com/share/61679420ae6b4c0cabccb5acf9b210d3?sharedAppSource=personal_library
        demo2 - https://www.loom.com/share/99a1c614873745b8b684bde7d5cea883?sharedAppSource=personal_library
        demo3 - https://www.loom.com/share/5ad50544cac546b28a5ab7f0ae613deb?sharedAppSource=personal_library
        demo4 - https://www.loom.com/share/c5773c328175460a868c8106a0db92cc?sharedAppSource=personal_library