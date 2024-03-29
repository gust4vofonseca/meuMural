document.addEventListener('DOMContentLoaded', ()=>{
    updatePosts();
})

function updatePosts() {

    fetch("http://10.0.0.102:3000/api/all").then(res => {
        return res.json()
    }).then(json => {
        
        let postElements = '';

        let posts = JSON.parse(json);

        posts.forEach((post)=>{
            let postElement = `
                    <div id=${post.id} class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title">${post.title}</h5>
                        </div>
                        <div class="card-body">
                            <div class="card-text">${post.description}</div>
                        </div>
                        <button onclick="deletePost(this.parentNode)">excluir</button>
                    </div>
            `;

            postElements += postElement;
        })

        document.getElementById('posts').innerHTML = postElements;



    })


}

function newPost(){

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    let post = {title,description};

    const options = {
        method:"POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(post),
    
    }

    fetch("http://10.0.0.102:3000/api/new",options).then(res => {
        updatePosts();
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    })
    
}

function deletePost(element){

    let id = {'id':element.id};

    const options = {
        method:"DELETE",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(id),
    
    }

    fetch("http://10.0.0.102:3000/api/del",options).then(res => {
        updatePosts();
 
    })

   
    
}