<template>
    <b-col cols="12" class="px-0">
        <div>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Eng" active>
                        <b-form-group
                                :label="$t('dashboard.fields.title')"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="title.en"
                                    placeholder=""
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                                :label="$t('dashboard.fields.Description')"
                                label-for="branch-textarea"
                        >
                            <ckeditor
                                    id="branch-textarea"
                                    v-model="description.en"
                            ></ckeditor>
                        </b-form-group>
                    </b-tab>
                    <b-tab title="Рус">
                        <b-form-group
                                :label="$t('dashboard.fields.name')"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="title.ru"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                                :label="$t('dashboard.fields.Description')"
                                label-for="branch-textarea"
                        >
                            <ckeditor
                                    id="branch-textarea"
                                    v-model="description.ru"
                            ></ckeditor>
                        </b-form-group>
                    </b-tab>
                    <b-tab title="Fra">
                        <b-form-group
                                :label="$t('dashboard.fields.name')"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="title.fr"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                                :label="$t('dashboard.fields.Description')"
                                label-for="branch-textarea"
                        >
                            <ckeditor
                                    id="branch-textarea"
                                    v-model="description.fr"
                            ></ckeditor>
                        </b-form-group>
                    </b-tab>

                    <b-tab title="中文">
                        <b-form-group
                                :label="$t('dashboard.fields.name')"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="title.ch"
                                    placeholder=""
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                                :label="$t('dashboard.fields.Description')"
                                label-for="branch-textarea"
                        >
                            <ckeditor
                                    id="branch-textarea"
                                    v-model="description.ch"
                            ></ckeditor>
                        </b-form-group>
                    </b-tab>

                    <b-tab title="Հայ">
                        <b-form-group
                                :label="$t('dashboard.fields.name')"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="title.am"
                                    placeholder=""
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                                :label="$t('dashboard.fields.Description')"
                                label-for="branch-textarea"
                        >
                            <ckeditor
                                    id="branch-textarea"
                                    v-model="description.am"
                            ></ckeditor>
                        </b-form-group>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </b-col>
</template>

<script>
    export default {
        title: "translation-fields",
        props: ["title", "description"]
    };
</script>

<style scoped></style>
