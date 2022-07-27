<template>
    <b-container fluid>
        <b-row>
            <b-col lg="8">
                <div class="base-card card mb-3">
                    <div class="card-body">
                        <h2 class="title-secondary text-center">{{$t("dashboard.edit.staticPages")}}</h2>
                        <div class="form-box">
                            <b-form action="#" method="post" @submit="onSubmit" @reset="onReset" >
                                <div class="tabs-content language-tabs">
                                    <b-tabs justified class="flex-nowrap">
                                        <b-tab class="language" active v-for="(tab, index) in tabs" v-bind:key="index">
                                            <template #title>
                                               {{tab.language}}
                                            </template>
                                            <div class="language-tab-content">
                                                <b-row>
                                                    <b-col cols="12">
                                                        <b-form-group 
                                                            label="Title" 
                                                            label-for="input-1">
                                                            <b-form-input
                                                            id="input-1"
                                                            type="text"
                                                            placeholder=""
                                                            ></b-form-input>
                                                        </b-form-group>
                                                    </b-col>
                                                    <b-col cols="12" class="">
                                                        <b-form-group
                                                            label="Description" 
                                                            label-for="section-description">
                                                            <b-form-textarea
                                                                id="section-description"
                                                                placeholder="Text"
                                                                rows="10"
                                                            ></b-form-textarea>
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </b-tab>
                                    </b-tabs>
                                </div>
                                <button type="submit"  class="btn btn-blue btn-form mb-2">{{$t("dashboard.btn.submit")}}</button>
                            </b-form>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

export default {
    data() {
        return {
            openBranch: true,
            preview: null,
            image: null,
            preview_list: [],
            image_list: [],

            form: {
                
            },

            imgs: {},
            imgLen:0,

            show: true,

            tabs: [
                {
                    language: "Eng"
                },

                {
                    language: "Ru"
                },

                {
                    language: "Sp"
                },

                {
                    language: "Ch"
                },

                {
                    language: "Arm"
                },

                {
                    language: "De"
                },

                {
                    language: "Fr"
                },
            
            ]

        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            let params = {
                title: this.title,
                description: this.description,
            };
            console.log(params)
            // axios.post('/filtersave', {
            //     params
            // })
            //     .then(resp => {
            //         console.log(4444)
            //     })
            // //
            // console.log(1234)
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            // this.form.title = ''
            // this.form.description = ''

            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            })
            // this.$router.push('/dashboard/statics')
        },

        exitEdit(){
        this.$emit('closeEdit', false)
      },
       addImg(event){
        let inputDOM = this.$refs.inputer;
        // Get file data through DOM
        this.fil = inputDOM.files;
        let oldLen=this.imgLen;
        let len=this.fil.length+oldLen;
        if(len>20){
          alert('Up to 20 sheets can be uploaded, you can also upload'+(20-oldLen)+'Zhang');
          return false;
        }
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5*1024*1024) {
            alert('Please select a picture within 5M! ');
            return false
          }
          this.imgLen++;
          this.$set(this.imgs,this.fil[i].name+'?'+new Date().getTime()+i,this.fil[i]);
        }
      },
      getObjectURL(file) {
        let url = null ;
        if (window.createObjectURL!==undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!==undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!==undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      
      delImg(key){
        this.$delete(this.imgs,key);
        this.imgLen--;
      },
      submit(){
          // console.log(321)
        for(let key in this.imgs){
          let name=key.split('?')[0];
          this.formData.append('multipartFiles',this.imgs[key],name);
        }
        this.$http.post('/opinion/feedback', this.formData,{
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
          this.alertShow=true;
        });
      },
  
    },
}
</script>



