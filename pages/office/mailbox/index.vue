<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <div class="page-content-top d-flex flex-wrap align-items-center justify-content-between">
                    <PageTitle :title="title" :image="image" />
                    <div class="search-group d-flex">
                        <SearchForm />
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col xl="3" md="5" class="inbox-card mb-3">
                <div class="card base-card">
                    <div class="card-body">
                        <button @click="compose()" class="compose-btn btn btn-block btn-blue mb-3">Comose</button>
                        <h4>Users</h4>
                        <ul class="card-list">
                            <li>
                               <a href="#" class="user-link d-flex justify-content-between">
                                    <img :src="require('@/assets/img/user.png')" alt="user avatar" class="user-avatar" />
                                    <span class="user-name">Test Name</span>
                               </a>
                            </li>
                            <li>
                                <a href="" class="user-link d-flex justify-content-between">
                                    <img :src="require('@/assets/img/user.png')" alt="user avatar" class="user-avatar" />
                                    <span class="user-name">Test Name</span>
                                </a>
                            </li>
                        </ul>  
                    </div>
                </div>
            </b-col>

            <b-col xl="9" md="7">
                <section v-if="mailbox === 'inbox'" class="static-section  mb-3">
                    <div class="title-box">
                        <h4 class="title p-3">Inbox</h4>
                    </div>
                    <b-table-simple responsive class="static-table reviews-table">
                        <b-tbody>
                            <b-tr>
                                <b-td>
                                    <span>
                                        <input type="checkbox" aria-label="check-inbox">
                                    </span>
                                </b-td>
                                <b-td>
                                    <span class="rating-stars d-flex justify-content-center">
                                        <svg-icon class="base-icon" name="star-regular" />
                                    </span>
                                </b-td>
                                <b-td><button @click="readMail()">Joh asjalk</button></b-td>
                                <b-td ><p class="inbox-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur ducimus odit aspernatur.</p></b-td>
                                <b-td>5 mins ago</b-td>
                            </b-tr>
                            <b-tr>
                                <b-td>
                                    <span>
                                        <label for="check-inbox"></label>
                                        <input id="check-inbox" type="checkbox" aria-label="check-inbox">
                                    </span>
                                </b-td>
                                <b-td>
                                    <span class="rating-stars d-flex justify-content-center">
                                        <svg-icon class="base-icon" name="star-regular" />
                                    </span>
                                </b-td>
                                <b-td><button @click="readMail()">Joh asjalk</button></b-td>
                                <b-td ><p class="inbox-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur ducimus odit aspernatur.</p></b-td>
                                <b-td>5 mins ago</b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </section>

                <div class="compose-card base-card card" v-else-if="mailbox === 'compose'">
                    <div class="card-header position-realtive">
                        <h3 class="card-title">Compose New Message</h3>
                        <button class="close-btn" @click="openInbox()">
                            <svg-icon class="md-icon" name="close"></svg-icon>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <input class="form-control" placeholder="To:">
                        </div>
                        <div class="form-group">
                            <input class="form-control" placeholder="Subject:">
                        </div>
                        <div class="form-group">
                            <textarea id="compose-textarea" class="form-control" style="height: 300px;"></textarea>
                        </div>
                        <div class="form-group">
                            <div>
                                <input id="compose-file" type="file" name="attachment">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="float-right">
                            <button type="button" class="btn btn-default">Draft</button>
                            <button type="submit" class="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>

                <div class="read-mail-card base-card card" v-else>
                    <div class="card-body position-relative">
                        <div class="card-top d-flex justify-content-between pr-5">
                            <h3 class="card-title">Read Mail</h3>
                            <button class="close-btn" @click="openInbox()">
                                <svg-icon class="md-icon" name="close"></svg-icon>
                            </button>
                        </div>  

                        <div class="p-0">
                            <div class="mailbox-read-info">
                                <h5>Message Subject Is Placed Here</h5>
                                <h6>From: support@adminlte.io</h6>
                            </div>
                        
                            <div class="mailbox-controls d-flex justify-content-center">
                                <div class="btn-list">
                                    <button type="button" class="btn btn-sm" data-container="body" title="Delete">
                                        <svg-icon class="base-icon" name="trash"></svg-icon>
                                    </button>
                                    <button type="button" class="btn btn-sm" data-container="body" title="Reply">
                                        <svg-icon class="base-icon" name="reply"></svg-icon>
                                    </button>
                                    <button type="button" class="btn btn-sm" data-container="body" title="Forward">
                                        <svg-icon class="base-icon" name="forward"></svg-icon>
                                    </button>
                                </div>
                                <button type="button" class="btn btn-sm ml-2" title="Print">
                                    <svg-icon class="base-icon" name="printer"></svg-icon>
                                </button>
                            </div>
                        
                            <div class="mailbox-read-message py-4">
                                <p>Hello John,</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ad a earum quae est optio eius omnis cum adipisci suscipit.</p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta impedit quia aperiam eum incidunt ab labore a eius illum ex adipisci esse, dolore, voluptate aliquam, sed ad nesciunt nobis ducimus!</p>
                                <p>Thanks,<br>Jane</p>
                            </div>
                        
                            </div>
                        
                            <div class="card-bottom">
                            <ul class="mailbox-attachments d-flex align-items-stretch flex-wrap">
                                <li class="d-flex flex-column justify-content-between">
                                    <span class="mailbox-attachment-icon overflow-hidden my-auto"><svg-icon class="lg-icon" name="docs"></svg-icon></span>

                                    <span class="mailbox-attachment-info">
                                        <a href="#" class="mailbox-attachment-name"><svg-icon class="sm-icon mr-2" name="paper-clip"></svg-icon>Sep2014-report.pdf</a>
                                        <span class="mailbox-attachment-size mt-1">
                                            <span>1,245 KB</span>
                                            <a href="#" class="btn"><svg-icon class="sm-icon" name="download"></svg-icon></a>
                                        </span>
                                    </span>
                                </li>
                                <li class="d-flex flex-column justify-content-between">
                                    <span class="mailbox-attachment-icon overflow-hidden my-auto"><svg-icon class="lg-icon" name="docs"></svg-icon></span>

                                    <span class="mailbox-attachment-info">
                                        <a href="#" class="mailbox-attachment-name"><svg-icon class="sm-icon mr-2" name="paper-clip"></svg-icon>App Description.docx</a>
                                        <span class="mailbox-attachment-size mt-1">
                                            <span>1,245 KB</span>
                                            <a href="#" class="btn"><svg-icon class="sm-icon" name="download"></svg-icon></a>
                                        </span>
                                    </span>
                                </li>
                                <li class="d-flex flex-column justify-content-between">
                                    <span class="mailbox-attachment-icon overflow-hidden has-img"><img :src="require('@/assets/img/cities/city01.jpeg')" alt="" class="img-fluid"/></span>

                                    <div class="mailbox-attachment-info">
                                        <a href="#" class="mailbox-attachment-name"><svg-icon class="sm-icon mr-2" name="paper-clip"></svg-icon>photo1.png</a>
                                        <span class="mailbox-attachment-size mt-1">
                                            <span>2.67 MB</span>
                                            <a href="#" class="btn"><svg-icon class="sm-icon" name="download"></svg-icon></a>
                                        </span>
                                    </div>
                                </li>
                                <li class="d-flex flex-column justify-content-between">
                                    <span class="mailbox-attachment-icon overflow-hidden has-img"><img :src="require('@/assets/img/cities/city01.jpeg')" alt="" class="img-fluid" /></span>

                                    <span class="mailbox-attachment-info">
                                        <a href="#" class="mailbox-attachment-name"><svg-icon class="sm-icon mr-2" name="paper-clip"></svg-icon>photo2.png</a>
                                        <span class="mailbox-attachment-size mt-1">
                                            <span>1.9 MB</span>
                                            <a href="#" class="btn"><svg-icon class="sm-icon" name="download"></svg-icon></a>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    
                        <div class="card-footer clearfix">
                            <div class="float-right">
                                <button type="button" class="btn mb-sm-0 mb-3"><svg-icon class="base-icon mr-2" name="reply"></svg-icon>Reply</button>
                                <button type="button" class="btn mb-sm-0 mb-3"><svg-icon class="base-icon mr-2" name="forward"></svg-icon>Forward</button>
                            </div>
                            <button type="button" class="btn mb-sm-0 mb-3"><svg-icon class="base-icon mr-2" name="trash"></svg-icon> Delete</button>
                            <button type="button" class="btn mb-sm-0 mb-3"><svg-icon class="base-icon mr-2" name="printer"></svg-icon> Print</button>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import PageTitle from '@/components/office/page-title.vue'
import SearchForm from '../../../components/dashboard/search-form.vue'

export default {
 
  components: {
    PageTitle,
    SearchForm,
  },

  data () {
    return {
        title: 'Inbox',
        image: 'inbox',
        selected: 'null',
        mailbox: 'inbox',

        optionsBranchs: [
                { value: 'null', text: 'Branchs', disabled: true },
                { value: 'Branch1', text: 'Branch1' },
                { value: 'Branch2', text: 'Branch2' },
                { value: 'Branch3', text: 'Branch3' },
            ],
        }
    },

    methods: {
        compose() {
            this.mailbox = 'compose';
        },

        readMail() {
            this.mailbox = "readMail";
        },

        openInbox() {
            this.mailbox ='inbox';
        }
    }
  
  
}

</script>
