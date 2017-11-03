<template>
    <page-load>
        <page-header title="Relatórios">

            <template slot="nav">
                <route href="reports" tag="li" exact>
                    <a>
                        <i class="mdi mdi-apps margin-right-5"></i>
                        Visão Geral
                    </a>
                </route>

                <route href="reports.sent" tag="li">
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