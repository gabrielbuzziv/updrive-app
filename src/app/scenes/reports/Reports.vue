<template>
    <page-load>
        <page-header title="Relatórios">

            <template slot="nav">
                <route href="reports.status" tag="li" exact>
                    <a>
                        <i class="mdi mdi-pulse margin-right-5"></i>
                        Situação Documentos
                    </a>
                </route>
            </template>
        </page-header>

        <page-content>
            <router-view></router-view>
        </page-content>
    </page-load>
</template>