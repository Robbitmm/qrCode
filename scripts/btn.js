let list = [];

function Read(){
    let videoPlayer = document.getElementById('preview'),
        scanner = new Instascan.Scanner(
        {
            video: videoPlayer,
            mirror: false
        }
    );
    
    videoPlayer.classList.add('active');
    
    scanner.addListener('scan', function(content){
        document.getElementById("result").value = content;
        Add(content);
        //window.open(content, "_blank");
    });
    
    Instascan.Camera.getCameras().then(cameras => 
    {
        if(cameras.length > 0){
            scanner.start(cameras[0]);
        }else{
            console.error("Não existe câmera no dispositivo!");
        }
    });
}

function Add(newItem){
    list.unshift(newItem);
    //alert(newItem + " foi adicionado com sucesso");

    console.log(list);
    AddtoList(list);
}

function AddtoList(list){
    let ul = document.getElementById('scanned');
    ul.innerHTML = ""

    for(let i = 0; i < list.length; i++){
        let li = document.createElement('li');
        ul.append(li);

        li.innerHTML = list[i];
    };
}