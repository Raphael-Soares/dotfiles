return {
    -- other configurations
    'nvim-lualine/lualine.nvim',
    lazy = false, -- make sure Lualine is not lazy-loaded
    config = function()
        require('lualine').setup {
            options = {
                theme = 'gruvbox-material', -- or set to 'powerline' for the classic Powerline theme
                section_separators = { left = '', right = '' },
                component_separators = { left = '', right = '' }
            },
            sections = {
                lualine_a = { 'mode' },
                lualine_b = { 'branch' },
                lualine_c = {
                    {
                        'filename',
                        path = 1, -- show only the current file name
                    },
                },
                lualine_x = {
                    {
                        require('lazy.status').updates, -- show updates from Lazy.nvim
                        cond = require('lazy.status').has_updates,
                    },
                },
                lualine_y = { 'progress' },
                lualine_z = { 'location' },
            },
        }
    end,
}
